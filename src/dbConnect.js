import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODEenv === 'TEST') {
  module.exports = new Pool({
    connectionString: process.env.DATABASETEST,
  });
}
if (process.env.NODEenv === 'DEV') {
  module.exports = new Pool({
    connectionString: process.env.DATABASEURL,
  });
}
// export default {
//   query: (text, params) => pool.query(text, params),
// };
