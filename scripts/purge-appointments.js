'use strict';

// Deletes appointment requests older than the clinic's retention period.
// Run it on a schedule, for example once a day from cron:
//   npm run purge:appointments

const { clinic } = require('../src/services/content');
const { purgeOlderThan } = require('../src/services/appointments');
const db = require('../src/db');
const { logError, errorName } = require('../src/services/log');

async function main() {
  const months = clinic.appointmentRetentionMonths;
  if (!Number.isInteger(months) || months < 1) {
    console.error('Set appointmentRetentionMonths in src/data/clinic.js first.');
    process.exit(1);
  }
  const removed = await purgeOlderThan(months);
  console.log(`${new Date().toISOString()} removed ${removed} appointment requests older than ${months} months.`);
}

main()
  .catch((error) => {
    logError(`could not remove old requests: ${errorName(error)}`);
    process.exitCode = 1;
  })
  .finally(() => db.close());
