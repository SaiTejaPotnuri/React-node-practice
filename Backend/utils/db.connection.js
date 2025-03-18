// utils/db.connection.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');4

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testConnection();

module.exports = pool;