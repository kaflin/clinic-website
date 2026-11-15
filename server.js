'use strict';

const { config, productionProblems } = require('./src/config');
const { missingFacts } = require('./src/services/content');
const { buildAssets } = require('./src/assets');
const { createApp } = require('./src/app');
const db = require('./src/db');

async function start() {
  const missing = missingFacts();

  if (config.isProduction) {
    // The live site must not start with weak settings or unfinished content.
    const problems = [...productionProblems(), ...missing.map((item) => `Missing content, ${item}`)];
    if (problems.length) {
      console.error('The site cannot start in production:');
      problems.forEach((problem) => console.error(`  - ${problem}`));
      process.exit(1);
    }
  } else if (missing.length) {
    console.warn(`${missing.length} clinic facts are still missing. Run "npm run check:content" to list them.`);
  }

  const assets = await buildAssets();
  const app = createApp(assets);
  const server = app.listen(config.port, () => {
    console.log(`Clinic website running at http://localhost:${config.port} (${config.isProduction ? 'production' : 'development'})`);
  });

  const stop = () => {
    server.close(() => db.close().finally(() => process.exit(0)));
  };
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

start().catch((error) => {
  console.error(`The site could not start: ${error.message}`);
  process.exit(1);
});
