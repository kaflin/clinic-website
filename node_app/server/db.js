'use strict';

// One shared MySQL connection pool. Queries always go through execute(),
// which sends values separately from the SQL text (prepared statements).

const mysql = require('mysql2/promise');
const { config } = require('./config');

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      socketPath: config.db.socketPath,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      charset: 'utf8mb4',
      connectionLimit: 5,
      waitForConnections: true,
    });
  }
  return pool;
}

async function execute(sql, values = []) {
  const [result] = await getPool().execute(sql, values);
  return result;
}

// Creates the database and the appointments table if they do not exist yet.
// Safe to run on every start. Needs a MySQL user allowed to CREATE.
async function init() {
  const name = config.db.database.replace(/[^A-Za-z0-9_]/g, '');
  const admin = await mysql.createConnection({
    host: config.db.host,
    port: config.db.port,
    socketPath: config.db.socketPath,
    user: config.db.user,
    password: config.db.password,
  });
  try {
    await admin.query(`CREATE DATABASE IF NOT EXISTS \`${name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    await admin.query(`CREATE TABLE IF NOT EXISTS \`${name}\`.appointments (
      id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
      full_name   VARCHAR(80)  NOT NULL,
      phone       VARCHAR(20)  NOT NULL,
      concern     VARCHAR(500) NULL,
      status      ENUM('new', 'called', 'booked', 'closed') NOT NULL DEFAULT 'new',
      created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      KEY idx_appointments_created_at (created_at)
    ) ENGINE=InnoDB`);
  } finally {
    await admin.end();
  }
}

async function close() {
  if (pool) await pool.end();
  pool = undefined;
}

module.exports = { execute, init, close };
