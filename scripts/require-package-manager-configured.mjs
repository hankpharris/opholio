const action = (process.argv[2] ?? '').trim();
const validActions = new Set(['install', 'build']);

if (!validActions.has(action)) {
  console.error('Usage: node ./scripts/require-package-manager-configured.mjs <install|build>');
  process.exit(1);
}

console.error(`Project is in agnostic-distributable mode. Cannot run ${action}.`);
console.error('Run one of these first, then commit and push:');
console.error('  node ./scripts/configure-package-manager.mjs npm');
console.error('  node ./scripts/configure-package-manager.mjs yarn');
process.exit(1);
