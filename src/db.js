import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import con from './dbConnect';
import bankAccount from './models/bankAccount';
import user from './models/user';
import transaction from './models/transaction';

dotenv.config();
class setupDb {
  static async createTables() {
    const passkey = bcrypt.hashSync(process.env.password, 10);
    const tableUser = user.userTable;
    const tableAccount = bankAccount.bankAccountTable;
    const tableTransaction = transaction.transactionTable;
    const tables = `${tableUser}; ${tableAccount}; ${tableTransaction};`;

    try {
      await con.query(user.addUser, ['Emile', 'Nsengimana', 'male', '0782057791', 'emile@gmail.com', passkey, 'staff', true]);
      await con.query(user.addUser, ['Jack', 'Shema', 'male', '0782057791', 'jack@gmail.com', passkey, 'staff', false]);
      return 'done';
    } catch (error) {
      return '';
    }
  }
}
setupDb.createTables();

export default setupDb;
