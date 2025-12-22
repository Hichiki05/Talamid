// src/config/db.js
const mysql = require('mysql2/promise'); // use promise-based API
require('dotenv').config();

// Create a pool for better performance & automatic reconnects
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'talamid_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Connected to MySQL database (pool)');
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1);
  }
};

testConnection();

module.exports = pool;
