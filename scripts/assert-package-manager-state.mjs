import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const ROOT_AGNOSTIC_INSTALL = 'node ./scripts/require-package-manager-configured.mjs install';
const ROOT_AGNOSTIC_BUILD = 'node ./scripts/require-package-manager-configured.mjs build';
const FRONTEND_AGNOSTIC_INSTALL = 'node ../scripts/require-package-manager-configured.mjs install';
const FRONTEND_AGNOSTIC_BUILD = 'node ../scripts/require-package-manager-configured.mjs build';

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function failIf(condition, message, failures) {
  if (condition) failures.push(message);
}

function assertAgnostic(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures) {
  failIf(Boolean(packageJson.packageManager), 'package.json must not contain packageManager.', failures);
  failIf(rootVercel.installCommand !== ROOT_AGNOSTIC_INSTALL, `vercel.json installCommand must be "${ROOT_AGNOSTIC_INSTALL}".`, failures);
  failIf(rootVercel.buildCommand !== ROOT_AGNOSTIC_BUILD, `vercel.json buildCommand must be "${ROOT_AGNOSTIC_BUILD}".`, failures);
  failIf(frontendVercel.installCommand !== FRONTEND_AGNOSTIC_INSTALL, `frontend/vercel.json installCommand must be "${FRONTEND_AGNOSTIC_INSTALL}".`, failures);
  failIf(frontendVercel.buildCommand !== FRONTEND_AGNOSTIC_BUILD, `frontend/vercel.json buildCommand must be "${FRONTEND_AGNOSTIC_BUILD}".`, failures);
  failIf(hasNpmLock, 'package-lock.json must not exist in agnostic state.', failures);
  failIf(hasYarnLock, 'yarn.lock must not exist in agnostic state.', failures);
}

function assertNpm(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures) {
  failIf(!String(packageJson.packageManager ?? '').startsWith('npm@'), 'package.json packageManager must start with "npm@".', failures);
  failIf(rootVercel.installCommand !== 'npm install', 'vercel.json installCommand must be "npm install".', failures);
  failIf(rootVercel.buildCommand !== 'npm run build', 'vercel.json buildCommand must be "npm run build".', failures);
  failIf(frontendVercel.installCommand !== 'npm install', 'frontend/vercel.json installCommand must be "npm install".', failures);
  failIf(frontendVercel.buildCommand !== 'npm run build', 'frontend/vercel.json buildCommand must be "npm run build".', failures);
  failIf(!hasNpmLock, 'package-lock.json must exist in npm state.', failures);
  failIf(hasYarnLock, 'yarn.lock must not exist in npm state.', failures);
}

function assertYarn(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures) {
  failIf(!String(packageJson.packageManager ?? '').startsWith('yarn@'), 'package.json packageManager must start with "yarn@".', failures);
  failIf(rootVercel.installCommand !== 'yarn install', 'vercel.json installCommand must be "yarn install".', failures);
  failIf(rootVercel.buildCommand !== 'yarn build', 'vercel.json buildCommand must be "yarn build".', failures);
  failIf(frontendVercel.installCommand !== 'yarn install', 'frontend/vercel.json installCommand must be "yarn install".', failures);
  failIf(frontendVercel.buildCommand !== 'yarn build', 'frontend/vercel.json buildCommand must be "yarn build".', failures);
  failIf(hasNpmLock, 'package-lock.json must not exist in yarn state.', failures);
  failIf(!hasYarnLock, 'yarn.lock must exist in yarn state.', failures);
}

function main() {
  const state = (process.argv[2] ?? '').trim().toLowerCase();
  if (!['agnostic', 'npm', 'yarn'].includes(state)) {
    console.error('Usage: node ./scripts/assert-package-manager-state.mjs <agnostic|npm|yarn>');
    process.exit(1);
  }

  const packageJson = readJson(path.join(repoRoot, 'package.json'));
  const rootVercel = readJson(path.join(repoRoot, 'vercel.json'));
  const frontendVercel = readJson(path.join(repoRoot, 'frontend', 'vercel.json'));

  const hasNpmLock = fs.existsSync(path.join(repoRoot, 'package-lock.json'));
  const hasYarnLock = fs.existsSync(path.join(repoRoot, 'yarn.lock'));
  const failures = [];

  if (state === 'agnostic') assertAgnostic(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures);
  if (state === 'npm') assertNpm(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures);
  if (state === 'yarn') assertYarn(packageJson, rootVercel, frontendVercel, hasNpmLock, hasYarnLock, failures);

  if (failures.length > 0) {
    console.error(`State assertion failed for "${state}":`);
    for (const failure of failures) {
      console.error(`- ${failure}`);
    }
    process.exit(1);
  }

  console.log(`State assertion passed for "${state}".`);
}

main();
