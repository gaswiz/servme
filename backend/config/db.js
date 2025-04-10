// backend/config/db.js
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'servme',
  connectionLimit: 5,
});

const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log(`✅ MariaDB Connected: ${conn.serverVersion()}`);
    conn.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('❌ Error connecting to MariaDB:', err);
    process.exit(1);
  }
};

export default connectDB;
export { pool };
