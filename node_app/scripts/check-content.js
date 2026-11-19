'use strict';

// Checks that every clinic fact is filled in. Run before every launch:
//   npm run check:content

const { missingFacts } = require('../server/services/content');

const missing = missingFacts();
// Exit code 0 means everything is filled in; 1 means facts are missing.
process.exit(missing.length === 0 ? 0 : 1);
