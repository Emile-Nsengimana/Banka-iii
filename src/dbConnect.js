import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

if (process.env.NODEenv === 'TEST') {
  pool = new Pool({
    connectionString: process.env.DATABASETEST,
  });
}
if (process.env.NODEenv === 'DEV') {
  pool = new Pool({
    connectionString: process.env.DATABASEURL,
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASEURL,
  });
}

export default pool;
