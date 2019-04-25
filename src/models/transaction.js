const transactionTable = `
CREATE TABLE IF NOT EXISTS
 transaction (
        transactionId serial primary key,
        createdOn date NOT NULL,
        type varchar(10) NOT NULL,
        accountNumber varchar(50),
        cashier integer,
        amount float,
        oldBalance float,
        newBalance float,
        foreign key(cashier) references users
    )`;
const makeTransaction = `insert into transaction (
    createdOn,
    type,
    accountNumber,
    cashier,
    amount,
    oldBalance,
    newBalance
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const searchTransaction = 'select transactionid,createdon, type, cashier, amount, oldbalance, newbalance from transaction where accountNumber = ($1)';
const getTransaction = 'select * from transaction where transactionid = ($1)';
const userTransaction = 'select * from transaction where accountnumber in (select accountnumber from bankaccount where owner = ($1))';

export default {
  transactionTable,
  makeTransaction,
  searchTransaction,
  getTransaction,
  userTransaction,
};
