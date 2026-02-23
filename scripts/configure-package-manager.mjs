import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const TARGETS = {
  npm: {
    packageManager: 'npm@10.9.2',
    installCommand: 'npm install',
    buildCommand: 'npm run build',
    installRunner: { cmd: 'npm', args: ['install'] },
  },
  yarn: {
    packageManager: 'yarn@4.9.1',
    installCommand: 'yarn install',
    buildCommand: 'yarn build',
    installRunner: { cmd: 'yarn', args: ['install'] },
  },
};

function replaceJsonStringField(source, key, value) {
  const regex = new RegExp(`("${key}"\\s*:\\s*)"[^"]*"`);
  if (!regex.test(source)) {
    throw new Error(`Could not find JSON string field "${key}".`);
  }
  return source.replace(regex, `$1"${value}"`);
}

function upsertJsonStringField(source, key, value) {
  const regex = new RegExp(`("${key}"\\s*:\\s*)"[^"]*"`);
  if (regex.test(source)) {
    return source.replace(regex, `$1"${value}"`);
  }

  const closeIndex = source.lastIndexOf('}');
  if (closeIndex === -1) {
    throw new Error('Invalid JSON: missing closing brace.');
  }

  const beforeClose = source.slice(0, closeIndex).replace(/\s*$/, '');
  const afterClose = source.slice(closeIndex);
  const indentMatch = source.match(/\n([ \t]+)"[^"\n]+"\s*:/);
  const indent = indentMatch ? indentMatch[1] : '  ';
  const needsComma = beforeClose.at(-1) !== '{';

  return `${beforeClose}${needsComma ? ',' : ''}\n${indent}"${key}": "${value}"\n${afterClose}`;
}

function updateFile(filePath, updates) {
  let source = fs.readFileSync(filePath, 'utf8');
  const original = source;

  for (const [key, value] of Object.entries(updates)) {
    source = replaceJsonStringField(source, key, value);
  }

  if (source !== original) {
    fs.writeFileSync(filePath, source, 'utf8');
  }
}

function main() {
  const mode = (process.argv[2] ?? '').trim().toLowerCase();
  if (!(mode in TARGETS)) {
    console.error('Usage: node ./scripts/configure-package-manager.mjs <npm|yarn>');
    process.exit(1);
  }

  const target = TARGETS[mode];
  const packageJsonPath = path.join(repoRoot, 'package.json');
  const packageSource = fs.readFileSync(packageJsonPath, 'utf8');
  const updatedPackageSource = upsertJsonStringField(packageSource, 'packageManager', target.packageManager);
  if (updatedPackageSource !== packageSource) {
    fs.writeFileSync(packageJsonPath, updatedPackageSource, 'utf8');
  }

  updateFile(path.join(repoRoot, 'vercel.json'), {
    installCommand: target.installCommand,
    buildCommand: target.buildCommand,
  });
  updateFile(path.join(repoRoot, 'frontend', 'vercel.json'), {
    installCommand: target.installCommand,
    buildCommand: target.buildCommand,
  });

  console.log(`Configured package manager: ${mode}`);
  console.log(`packageManager -> ${target.packageManager}`);
  console.log(`vercel installCommand -> ${target.installCommand}`);
  console.log(`vercel buildCommand -> ${target.buildCommand}`);
  console.log(`Running ${target.installCommand}...`);

  const installResult = spawnSync(target.installRunner.cmd, target.installRunner.args, {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (installResult.status !== 0) {
    console.error(`Install failed with exit code ${installResult.status ?? 'unknown'}.`);
    process.exit(installResult.status ?? 1);
  }

  const npmLockPath = path.join(repoRoot, 'package-lock.json');
  const yarnLockPath = path.join(repoRoot, 'yarn.lock');
  if (mode === 'npm' && fs.existsSync(yarnLockPath)) {
    fs.unlinkSync(yarnLockPath);
    console.log('Removed yarn.lock to keep npm workflow consistent.');
  }
  if (mode === 'yarn' && fs.existsSync(npmLockPath)) {
    fs.unlinkSync(npmLockPath);
    console.log('Removed package-lock.json to keep yarn workflow consistent.');
  }

  const hasNpmLock = fs.existsSync(npmLockPath);
  const hasYarnLock = fs.existsSync(yarnLockPath);
  if (mode === 'npm' && !hasNpmLock) {
    console.warn('Warning: package-lock.json not found after install.');
  } else if (mode === 'yarn' && !hasYarnLock) {
    console.warn('Warning: yarn.lock not found after install.');
  }
  console.log('Done. Commit the lockfile for the manager you selected.');
}

main();
