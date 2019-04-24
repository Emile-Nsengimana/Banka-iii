import con from './dbConnect';
import bankAccount from './models/bankAccount';
import user from './models/user';
import transaction from './models/transaction';


class setupDb {
  static async createTables() {
    const tableUser = user.userTable;
    const tableAccount = bankAccount.bankAccountTable;
    const tableTransaction = transaction.transactionTable;
    const tables = `${tableUser}; ${tableAccount}; ${tableTransaction};`;
    const staff = `insert into users (firstName, lastName, gender, phoneNumber, email, password, type, isAdmin)
    VALUES('Emile','Nsengimana','male','0782057791','emile@gmail.com','open','staff','true') ON CONFLICT DO NOTHING returning *;
    insert into users (firstName, lastName, gender, phoneNumber, email, password, type, isAdmin)
    VALUES('Jack','Shema','male','0782057791','jack@gmail.com','open','staff','false') ON CONFLICT DO NOTHING returning *`;
    try {
      await con.query(tables);
      await con.query(staff);
    } catch (error) {
      return error;
    }
  }

  static async dropTables() {
    try {
      const dropTable = 'drop table transaction; drop table bankaccount; drop table users;';
      await con.query(dropTable);
    } catch (error) {
      return error;
    }
  }
}
setupDb.createTables();
setupDb.dropTables();

export default setupDb;
