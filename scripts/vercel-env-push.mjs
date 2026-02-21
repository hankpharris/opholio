import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import readline from 'node:readline/promises';

const STANDARD_ENVIRONMENTS = ['production', 'preview', 'development'];

function parseDotenv(content) {
  const map = new Map();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    map.set(key, value);
  }
  return map;
}

function resolveVercelProjectPath() {
  const rootProjectPath = path.join(process.cwd(), '.vercel', 'project.json');
  if (fs.existsSync(rootProjectPath)) return rootProjectPath;

  const frontendProjectPath = path.join(process.cwd(), 'frontend', '.vercel', 'project.json');
  if (fs.existsSync(frontendProjectPath)) return frontendProjectPath;

  return '';
}

function readLinkedProject() {
  const projectPath = resolveVercelProjectPath();
  if (!projectPath) return null;

  try {
    const raw = fs.readFileSync(projectPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (typeof parsed?.projectId === 'string' && typeof parsed?.orgId === 'string') {
      return { projectId: parsed.projectId, orgId: parsed.orgId };
    }
  } catch (_) {
    return null;
  }

  return null;
}

function getAuthFileCandidates() {
  const home = os.homedir();
  const appData = process.env.APPDATA;
  const globalConfig = process.env.VERCEL_GLOBAL_CONFIG;

  const candidates = [
    globalConfig ? path.join(globalConfig, 'auth.json') : '',
    appData ? path.join(appData, 'com.vercel.cli', 'Data', 'auth.json') : '',
    path.join(home, '.vercel', 'auth.json'),
    path.join(home, '.now', 'auth.json'),
    appData ? path.join(appData, 'now', 'Data', 'auth.json') : '',
  ].filter(Boolean);

  return [...new Set(candidates)];
}

function getVercelToken() {
  const envToken = process.env.VERCEL_TOKEN?.trim();
  if (envToken) return envToken;

  for (const authFile of getAuthFileCandidates()) {
    if (!fs.existsSync(authFile)) continue;
    try {
      const parsed = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      const token = typeof parsed?.token === 'string' ? parsed.token.trim() : '';
      if (token) return token;
    } catch (_) {
      // Ignore malformed files and continue trying other known locations.
    }
  }

  return '';
}

function buildApiUrl({ projectId, orgId, pathname, query = {} }) {
  const url = new URL(`https://api.vercel.com${pathname}`);
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === '') continue;
    url.searchParams.set(key, String(value));
  }
  if (orgId.startsWith('team_')) {
    url.searchParams.set('teamId', orgId);
  }
  return url;
}

async function vercelApiRequest({ token, method = 'GET', url, body }) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const text = await res.text();
  const payload = text ? safelyParseJson(text) : null;

  if (!res.ok) {
    const serverMessage = payload?.error?.message || payload?.message || text || `${res.status} ${res.statusText}`;
    throw new Error(`Vercel API ${method} ${url.pathname} failed: ${serverMessage}`);
  }

  return payload;
}

function safelyParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (_) {
    return null;
  }
}

function normalizeTargets(target) {
  if (Array.isArray(target)) return target.filter((t) => typeof t === 'string' && t);
  if (typeof target === 'string' && target) return [target];
  return [];
}

function sameTargets(a, b) {
  const left = [...a].sort().join(',');
  const right = [...b].sort().join(',');
  return left === right;
}

function getStandardTargets(record) {
  return normalizeTargets(record?.target).filter((target) => STANDARD_ENVIRONMENTS.includes(target));
}

function isConsolidatableRecord(record) {
  if (record?.gitBranch) return false;
  if (Array.isArray(record?.customEnvironmentIds) && record.customEnvironmentIds.length > 0) return false;
  return getStandardTargets(record).length > 0;
}

function pickRecordToKeep(records, preferredId, desiredTargets) {
  if (preferredId) {
    const preferred = records.find((record) => record?.id === preferredId);
    if (preferred) return preferred;
  }

  const matchingTargetRecord = records.find((record) => sameTargets(getStandardTargets(record), desiredTargets));
  if (matchingTargetRecord) return matchingTargetRecord;

  return [...records].sort((a, b) => (b?.createdAt ?? 0) - (a?.createdAt ?? 0))[0] ?? null;
}

function extractCreatedRecordId(result) {
  if (result && typeof result.id === 'string') {
    return result.id;
  }

  if (result && typeof result === 'object' && Array.isArray(result.created) && result.created[0]?.id) {
    return result.created[0].id;
  }

  if (result && typeof result === 'object' && result.env?.id) {
    return result.env.id;
  }

  return '';
}

function getTargetEnvironmentsForKey(environments, isSensitive) {
  if (!isSensitive) return environments;
  return environments.filter((environment) => environment !== 'development');
}

async function upsertEnvVar({ projectId, orgId, token, key, value, environments, sensitive }) {
  const url = buildApiUrl({
    projectId,
    orgId,
    pathname: `/v10/projects/${projectId}/env`,
    query: { upsert: 'true' },
  });

  return vercelApiRequest({
    token,
    method: 'POST',
    url,
    body: {
      type: sensitive ? 'sensitive' : 'encrypted',
      key,
      value,
      target: environments,
    },
  });
}

async function listEnvVars({ projectId, orgId, token }) {
  const url = buildApiUrl({
    projectId,
    orgId,
    pathname: `/v10/projects/${projectId}/env`,
    query: { source: 'vercel-env-push-script' },
  });
  const result = await vercelApiRequest({ token, url });
  return Array.isArray(result?.envs) ? result.envs : [];
}

async function removeEnvVar({ projectId, orgId, token, id }) {
  const url = buildApiUrl({
    projectId,
    orgId,
    pathname: `/v10/projects/${projectId}/env/${id}`,
  });
  await vercelApiRequest({ token, method: 'DELETE', url });
}

async function consolidateEnvVarRecords({ projectId, orgId, token, key, desiredTargets, preferredId }) {
  const envs = await listEnvVars({ projectId, orgId, token });
  const matching = envs.filter((record) => record?.key === key && isConsolidatableRecord(record));
  if (matching.length <= 1) return;

  const keep = pickRecordToKeep(matching, preferredId, desiredTargets);
  if (!keep?.id) return;

  const recordsToRemove = matching.filter((record) => record?.id && record.id !== keep.id);
  for (const record of recordsToRemove) {
    await removeEnvVar({ projectId, orgId, token, id: record.id });
  }
}

function resolveEnvironments(input) {
  const normalized = input.trim().toLowerCase();
  if (!normalized || normalized === 'all') {
    return ['production', 'preview', 'development'];
  }
  if (normalized === 'production' || normalized === 'preview' || normalized === 'development') {
    return [normalized];
  }
  return ['production', 'preview', 'development'];
}

async function main() {
  const linkedProject = readLinkedProject();
  if (!linkedProject) {
    console.error('This repo is not linked to a Vercel project yet.');
    console.error('Run `npx vercel link` first, then rerun this script.');
    process.exit(1);
  }
  const { projectId, orgId } = linkedProject;

  const token = getVercelToken();
  if (!token) {
    console.error('Could not find a Vercel auth token.');
    console.error('Run `npx vercel login` (or set VERCEL_TOKEN) and rerun this script.');
    process.exit(1);
  }

  const envPath = path.join(process.cwd(), 'frontend', '.env.local');
  const rootEnvPath = path.join(process.cwd(), '.env.local');
  const chosenEnvPath = fs.existsSync(rootEnvPath) ? rootEnvPath : envPath;

  if (!fs.existsSync(chosenEnvPath)) {
    console.error(`Missing ${rootEnvPath} (and ${envPath})`);
    console.error('Run `yarn setup:nextauth` / `npm run setup:nextauth` (and/or `npx vercel env pull`) first.');
    process.exit(1);
  }

  const env = parseDotenv(fs.readFileSync(chosenEnvPath, 'utf8'));

  const keysToPush = [
    'NEXTAUTH_URL',
    'NEXTAUTH_URL_INTERNAL',
    'NEXTAUTH_SECRET',
    'ALLOWED_GITHUB_USERS',
    'GITHUB_ID',
    'GITHUB_SECRET',
    'GITHUB_ID_PERSONAL',
    'GITHUB_SECRET_PERSONAL',
    'NEXT_PUBLIC_BASE_URL',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_VERCEL_URL',
    'OPENAI_API_KEY',
  ];

  const sensitiveKeys = new Set(['NEXTAUTH_SECRET', 'GITHUB_SECRET', 'GITHUB_SECRET_PERSONAL', 'OPENAI_API_KEY']);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const envChoice = await rl.question(
      'Push to which Vercel environment? (all/production/preview/development) [all]: '
    );
    const environments = resolveEnvironments(envChoice);

    console.log(`Reading env vars from: ${chosenEnvPath}`);

    const missing = keysToPush.filter((k) => !env.get(k));
    if (missing.length > 0) {
      console.log('Skipping missing values:');
      for (const k of missing) console.log(`- ${k}`);
      console.log('');
    }

    for (const key of keysToPush) {
      const value = env.get(key);
      if (!value) continue;

      const isSensitive = sensitiveKeys.has(key);
      const targetEnvironments = getTargetEnvironmentsForKey(environments, isSensitive);

      if (isSensitive && environments.includes('development')) {
        console.warn(
          `Warning: ${key} cannot target development as sensitive; pushing to ${targetEnvironments.join(', ') || '(none)'}.`
        );
      }

      if (targetEnvironments.length === 0) {
        console.warn(`Skipping ${key}: no supported targets selected.`);
        continue;
      }

      const upsertResult = await upsertEnvVar({
        projectId,
        orgId,
        token,
        key,
        value,
        environments: targetEnvironments,
        sensitive: isSensitive,
      });

      await consolidateEnvVarRecords({
        projectId,
        orgId,
        token,
        key,
        desiredTargets: targetEnvironments,
        preferredId: extractCreatedRecordId(upsertResult),
      });
    }

    console.log(`Done. Pushed env vars to Vercel (${environments.join(', ')}).`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`Error: ${err?.message ?? String(err)}`);
  process.exit(1);
});
