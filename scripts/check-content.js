'use strict';

// Lists the clinic facts that still need filling in. Run before every launch:
//   npm run check:content

const { missingFacts } = require('../src/services/content');

const missing = missingFacts();
if (missing.length === 0) {
  console.log('All clinic facts are filled in.');
  process.exit(0);
}

console.log(`${missing.length} items still need the clinic's real details (files are in src/data):\n`);
missing.forEach((item) => console.log(`  - ${item}`));
process.exit(1);
