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
    const staff = `insert into users (firstName, lastName, gender, phoneNumber, email, password, type, isAdmin)
    VALUES('Emile','Nsengimana','male','0782057791','emile@gmail.com','open','staff','true') ON CONFLICT DO NOTHING returning *;
    insert into users (firstName, lastName, gender, phoneNumber, email, password, type, isAdmin)
    VALUES('Jack','Shema','male','0782057791','jack@gmail.com','open','staff','false') ON CONFLICT DO NOTHING returning *`;

    con.query(staff);
    con.query(tables);
  }

  static dropTables() {
    const dropTable = 'drop table transaction; drop table bankaccount; drop table users;';
    con.query(dropTable);
  }
}
setupDb.createTables();

export default setupDb;
