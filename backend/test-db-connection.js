// Test database connection script
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    console.log('Host:', process.env.DB_HOST);
    console.log('Port:', process.env.DB_PORT);
    console.log('User:', process.env.DB_USER);
    console.log('Database:', process.env.DB_NAME);
    
    // Test DNS resolution first
    console.log('🔍 Testing DNS resolution...');
    const dns = require('dns').promises;
    try {
      const addresses = await dns.lookup(process.env.DB_HOST);
      console.log('✅ DNS resolved to:', addresses);
    } catch (dnsError) {
      console.log('❌ DNS resolution failed:', dnsError.message);
      console.log('🔧 Trying alternative connection method...');
    }
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
      connectTimeout: 30000,
      acquireTimeout: 30000,
      timeout: 30000,
      ssl: {
        rejectUnauthorized: false
      }
    });

    console.log('✅ Database connection successful!');
    
    // Test query
    const [results] = await connection.execute('SELECT 1 as test');
    console.log('✅ Test query successful:', results);
    
    await connection.end();
    console.log('✅ Connection closed properly');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();