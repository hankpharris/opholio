import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { spawn } from 'node:child_process';

function parseDotenv(content) {
  const map = new Map();
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    map.set(key, value);
  }
  return map;
}

function hasVercelLink() {
  return (
    fs.existsSync(path.join(process.cwd(), '.vercel', 'project.json')) ||
    fs.existsSync(path.join(process.cwd(), 'frontend', '.vercel', 'project.json'))
  );
}

function runVercelEnvAdd({ key, value, environment, sensitive }) {
  return new Promise((resolve, reject) => {
    const vercelCli = path.join(process.cwd(), 'node_modules', 'vercel', 'dist', 'index.js');
    const args = ['env', 'add', key, environment, '--force', ...(sensitive ? ['--sensitive'] : [])];

    const child = spawn(process.execPath, [vercelCli, ...args], {
      stdio: ['pipe', 'inherit', 'inherit'],
      env: process.env,
    });

    child.stdin.write(`${value}\n`);
    child.stdin.end();

    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`vercel env add ${key} ${environment} exited with code ${code}`));
    });
  });
}

async function main() {
  if (!hasVercelLink()) {
    console.error('This repo is not linked to a Vercel project yet.');
    console.error('Run `npx vercel link` first, then rerun this script.');
    process.exit(1);
  }

  const envPath = path.join(process.cwd(), 'frontend', '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error(`Missing ${envPath}`);
    console.error('Run `yarn setup:nextauth` (and/or `npx vercel env pull ./frontend/.env.local`) first.');
    process.exit(1);
  }

  const env = parseDotenv(fs.readFileSync(envPath, 'utf8'));

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
  ];

  const sensitiveKeys = new Set(['NEXTAUTH_SECRET', 'GITHUB_SECRET', 'GITHUB_SECRET_PERSONAL']);

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const envChoice = (await rl.question('Push to which Vercel environment? (production/preview/development) [production]: ')).trim() || 'production';
    const environment =
      envChoice === 'production' || envChoice === 'preview' || envChoice === 'development'
        ? envChoice
        : 'production';

    const missing = keysToPush.filter((k) => !env.get(k));
    if (missing.length > 0) {
      console.log('Skipping missing values in frontend/.env.local:');
      for (const k of missing) console.log(`- ${k}`);
      console.log('');
    }

    for (const key of keysToPush) {
      const value = env.get(key);
      if (!value) continue;
      await runVercelEnvAdd({ key, value, environment, sensitive: sensitiveKeys.has(key) });
    }

    console.log(`Done. Pushed env vars to Vercel (${environment}).`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(`Error: ${err?.message ?? String(err)}`);
  process.exit(1);
});

