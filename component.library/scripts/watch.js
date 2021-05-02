const npm = require('npm');
const TscWatchClient = require('tsc-watch/client');
const watch = new TscWatchClient();

// menti: tsc-watch reference: https://www.npmjs.com/package/tsc-watch
// TODO: run babel directly with out using npm
npm.load(() => {
  // use first_success when need
  watch.on('success', () => {
    npm.run('babel');
  });

  watch.on('compile_errors', () => {
    // we don't want to stop babel compilation on minor issues like unused variable
    npm.run('babel');
  });

  watch.start('--project', './tsconfig.build.json');
});