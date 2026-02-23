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

function replaceJsonStringField(source, key, value) {
  const regex = new RegExp(`("${key}"\\s*:\\s*)"[^"]*"`);
  if (!regex.test(source)) {
    throw new Error(`Could not find JSON string field "${key}".`);
  }
  return source.replace(regex, `$1"${value}"`);
}

function removeJsonStringField(source, key) {
  const withLeadingComma = new RegExp(`,\\s*\\n(\\s*)"${key}"\\s*:\\s*"[^"]*"`);
  if (withLeadingComma.test(source)) {
    return source.replace(withLeadingComma, '');
  }

  const withTrailingComma = new RegExp(`(\\s*)"${key}"\\s*:\\s*"[^"]*",\\s*\\n`);
  if (withTrailingComma.test(source)) {
    return source.replace(withTrailingComma, '');
  }

  return source;
}

function updatePackageJson(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  const updated = removeJsonStringField(original, 'packageManager');
  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }
}

function updateVercelJson(filePath, installCommand, buildCommand) {
  let source = fs.readFileSync(filePath, 'utf8');
  const original = source;
  source = replaceJsonStringField(source, 'installCommand', installCommand);
  source = replaceJsonStringField(source, 'buildCommand', buildCommand);
  if (source !== original) {
    fs.writeFileSync(filePath, source, 'utf8');
  }
}

function removeIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}

function main() {
  updatePackageJson(path.join(repoRoot, 'package.json'));
  updateVercelJson(path.join(repoRoot, 'vercel.json'), ROOT_AGNOSTIC_INSTALL, ROOT_AGNOSTIC_BUILD);
  updateVercelJson(
    path.join(repoRoot, 'frontend', 'vercel.json'),
    FRONTEND_AGNOSTIC_INSTALL,
    FRONTEND_AGNOSTIC_BUILD,
  );

  const removedNpmLock = removeIfExists(path.join(repoRoot, 'package-lock.json'));
  const removedYarnLock = removeIfExists(path.join(repoRoot, 'yarn.lock'));

  console.log('Reset repository to agnostic-distributable mode.');
  console.log('Removed packageManager from package.json.');
  console.log('Set vercel install/build commands to explicit "configure first" guards.');
  console.log(`Removed package-lock.json: ${removedNpmLock ? 'yes' : 'no'}`);
  console.log(`Removed yarn.lock: ${removedYarnLock ? 'yes' : 'no'}`);
  console.log('Next: run `node ./scripts/assert-package-manager-state.mjs agnostic`.');
}

main();
