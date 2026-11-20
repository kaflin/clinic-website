'use strict';

// Reads settings from environment variables. Secrets never live in the code.

const path = require('node:path');
const fs = require('node:fs');

const envFile = path.join(__dirname, '..', '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const env = process.env;
const isProduction = env.NODE_ENV === 'production';

const config = {
  isProduction,
  port: Number(env.PORT) || 3000,
  siteUrl: (env.SITE_URL || 'http://localhost:3000').replace(/\/+$/, ''),
  cookieSecret: env.COOKIE_SECRET || '',
  mail: {
    host: env.SMTP_HOST || '',
    port: Number(env.SMTP_PORT) || 587,
    user: env.SMTP_USER || '',
    password: env.SMTP_PASSWORD || '',
    from: env.MAIL_FROM || '',
    frontDesk: env.FRONT_DESK_EMAIL || '',
  },
};

// Problems that must stop a production start. Returned as a list so the
// caller decides what to do with them.
function productionProblems() {
  const problems = [];
  if (config.cookieSecret.length < 32) problems.push('COOKIE_SECRET must be at least 32 characters.');
  if (!config.siteUrl.startsWith('https://')) problems.push('SITE_URL must start with https://');
  return problems;
}

if (!isProduction && !config.cookieSecret) {
  // Development only: a throwaway secret so the site runs without setup.
  config.cookieSecret = require('node:crypto').randomBytes(32).toString('hex');
}

module.exports = { config, productionProblems };
