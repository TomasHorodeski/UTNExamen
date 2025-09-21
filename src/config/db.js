const mysql = require('mysql2/promise');
const { env } = require('./env');

let pool = null;

function getPool() {
  if (pool) return pool;
  pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 10,
    enableKeepAlive: true
  });
  return pool;
}

module.exports = { getPool };
