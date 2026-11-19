'use strict';

// Deletes appointment requests older than the clinic's retention period.
// Run it on a schedule, for example once a day from cron:
//   npm run purge:appointments

const { clinic } = require('../server/services/content');
const { purgeOlderThan } = require('../server/services/appointments');
const db = require('../server/db');

async function main() {
  const months = clinic.appointmentRetentionMonths;
  if (!Number.isInteger(months) || months < 1) {
    process.exit(1);
  }
  await purgeOlderThan(months);
}

main()
  .catch(() => {
    process.exitCode = 1;
  })
  .finally(() => db.close());
