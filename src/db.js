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

async function close() {
  if (pool) await pool.end();
  pool = undefined;
}

module.exports = { execute, close };
