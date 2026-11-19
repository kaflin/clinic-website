'use strict';

const { config, productionProblems } = require('./config');
const { missingFacts } = require('./services/content');
const { buildAssets } = require('./assets');
const { createApp } = require('./app');
const db = require('./db');

async function start() {
  const missing = missingFacts();

  if (config.isProduction) {
    // The live site must not start with weak settings or unfinished content.
    const problems = [...productionProblems(), ...missing.map((item) => `Missing content, ${item}`)];
    if (problems.length) {
      process.exit(1);
    }
  }

  try {
    await db.init();
  } catch {
    // The pages still work without the database; only the form needs it.
    if (config.isProduction) process.exit(1);
  }

  const assets = await buildAssets();
  const app = createApp(assets);
  const server = app.listen(config.port);

  const stop = () => {
    server.close(() => db.close().finally(() => process.exit(0)));
  };
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

start().catch(() => {
  process.exit(1);
});
