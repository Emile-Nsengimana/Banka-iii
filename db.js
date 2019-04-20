import con from './dbConnect';
import bankAccount from './src/models/bankAccount';
import user from './src/models/user';
import transaction from './src/models/transaction';


class setupDb {
  static createTables() {
    const tableUser = user.userTable;
    const tableTransaction = transaction.transactionTable;
    const tableAccount = bankAccount.bankAccountTable;
    const tables = `${tableUser}; ${tableAccount}; ${tableTransaction};`;
    con.query(tables);
  }
}
setupDb.createTables();
