import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import con from './dbConnect';
import bankAccount from './models/bankAccount';
import user from './models/user';
import transaction from './models/transaction';

dotenv.config();
const createTables = async () => {
  const passkey = bcrypt.hashSync(process.env.password, 10);
  const tableUser = user.userTable;
  const tableAccount = bankAccount.bankAccountTable;
  const tableTransaction = transaction.transactionTable;
  const tables = `${tableUser}; ${tableAccount}; ${tableTransaction};`;

  await con.query(tables);
  await con.query(user.addUser, ['Emile', 'Nsengimana', 'male', '0782057791', 'admin@gmail.com', passkey, 'staff', true]);
  await con.query(user.addUser, ['Jack', 'Shema', 'male', '0782057791', 'staff@gmail.com', passkey, 'staff', false]);
};
createTables();

export default createTables;
