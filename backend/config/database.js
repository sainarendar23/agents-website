const mysql = require('mysql2/promise');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'som_ai',
        charset: 'utf8mb4',
        connectTimeout: 30000,
        acquireTimeout: 30000,
        timeout: 30000,
        ssl: {
          rejectUnauthorized: false
        }
      });

      console.log('Connected to MySQL database');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }
  }

  async query(sql, params = []) {
    try {
      const [results] = await this.connection.execute(sql, params);
      return results;
    } catch (error) {
      console.error('Database query failed:', error);
      throw error;
    }
  }

  async close() {
    if (this.connection) {
      await this.connection.end();
      console.log('Database connection closed');
    }
  }
}

module.exports = new Database();