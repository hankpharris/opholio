import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';

function normalizeUrl(raw) {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed.replace(/\/+$/, '');
  return `https://${trimmed.replace(/\/+$/, '')}`;
}

function header(title) {
  return `\n# ${title}\n`;
}

function upsertEnvLines(existing, updates) {
  const lines = existing.split(/\r?\n/);
  const seen = new Set();

  const updatedLines = lines.map((line) => {
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!match) return line;
    const key = match[1];
    if (!(key in updates)) return line;
    seen.add(key);
    return `${key}=${updates[key]}`;
  });

  for (const [key, value] of Object.entries(updates)) {
    if (seen.has(key)) continue;
    updatedLines.push(`${key}=${value}`);
  }

  return `${updatedLines.join('\n').replace(/\n+$/, '')}\n`;
}

function upsertEnvFile(envPath, updates) {
  const previous = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  fs.mkdirSync(path.dirname(envPath), { recursive: true });
  fs.writeFileSync(envPath, upsertEnvLines(previous, updates), 'utf8');
}

function resolveRepoRoot() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'frontend'))) {
    return cwd;
  }
  if (path.basename(cwd) === 'frontend') {
    const parent = path.resolve(cwd, '..');
    if (fs.existsSync(path.join(parent, 'package.json'))) {
      return parent;
    }
  }
  return cwd;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    console.log('NextAuth quick setup (updates .env.local files).');
    console.log('Tip: use your Vercel Production URL, e.g. https://your-project.vercel.app');

    const siteUrlInput = await rl.question('Site URL: ');
    const siteUrl = normalizeUrl(siteUrlInput);
    if (!siteUrl) {
      throw new Error('Site URL is required.');
    }

    const githubUser = (await rl.question('Your GitHub username (for ALLOWED_GITHUB_USERS): ')).trim();
    if (!githubUser) {
      throw new Error('GitHub username is required.');
    }

    const githubClientId = (await rl.question('GitHub OAuth Client ID (leave blank to fill later): ')).trim();
    const githubClientSecret = (await rl.question('GitHub OAuth Client Secret (leave blank to fill later): ')).trim();

    const nextAuthSecret = crypto.randomBytes(32).toString('base64');

    const updates = {
      NEXTAUTH_URL: siteUrl,
      NEXTAUTH_URL_INTERNAL: siteUrl,
      NEXTAUTH_SECRET: nextAuthSecret,
      ALLOWED_GITHUB_USERS: githubUser,
      NEXT_PUBLIC_BASE_URL: siteUrl,
      NEXT_PUBLIC_API_URL: siteUrl,
      NEXT_PUBLIC_VERCEL_URL: siteUrl,
      ...(githubClientId ? { GITHUB_ID: githubClientId, GITHUB_ID_PERSONAL: githubClientId } : {}),
      ...(githubClientSecret ? { GITHUB_SECRET: githubClientSecret, GITHUB_SECRET_PERSONAL: githubClientSecret } : {}),
    };

    console.log(header('Wrote env vars'));
    const repoRoot = resolveRepoRoot();
    const rootEnvPath = path.join(repoRoot, '.env.local');
    const frontendEnvPath = path.join(repoRoot, 'frontend', '.env.local');

    upsertEnvFile(rootEnvPath, updates);
    upsertEnvFile(frontendEnvPath, updates);

    console.log(`Updated: ${rootEnvPath}`);
    console.log(`Updated: ${frontendEnvPath}`);
    console.log('Next step: push these env vars to Vercel (see README).');

    console.log(header('GitHub OAuth callback URL'));
    console.log('Set this as the Authorization callback URL on your GitHub OAuth App:');
    console.log(`${siteUrl}/api/auth/callback/github-vercel`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`\nError: ${err?.message ?? String(err)}`);
  process.exit(1);
});
