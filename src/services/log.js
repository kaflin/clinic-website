'use strict';

// One place for server error logs, so every line has the time first.
// Never pass form contents or patient details to this.

function logError(message) {
  console.error(`${new Date().toISOString()} ${message}`);
}

// The short, safe name of an error: its code if it has one, else its type.
const errorName = (error) => error.code || error.name;

module.exports = { logError, errorName };
