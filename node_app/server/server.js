'use strict';

const { config, productionProblems } = require('./config');
const { buildAssets } = require('./assets');
const { createApp } = require('./app');

const say = (text) => process.stderr.write(`${new Date().toISOString()} ${text}\n`);

async function start() {
  if (config.isProduction) {
    // The live site must not start with weak settings. Missing clinic facts do
    // not stop it: the page shows a [MARKER] where a fact is empty.
    const problems = productionProblems();
    if (problems.length) {
      say(`Cannot start in production: ${problems.join(' ')}`);
      process.exit(1);
    }
  }

  const assets = await buildAssets();
  const app = createApp(assets);
  const server = app.listen(config.port);

  const stop = () => {
    server.close(() => process.exit(0));
  };
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

start().catch((error) => {
  say(`The site could not start: ${error.stack || error.message}`);
  process.exit(1);
});
