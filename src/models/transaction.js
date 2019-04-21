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
        foreign key(cashier) references users,
        foreign key(accountNumber) references bankaccount
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

const searchTransaction = 'select * from transaction where accountNumber = ($1)';
const getTransaction = 'select * from transaction where transactionid = ($1)';

export default {
  transactionTable,
  makeTransaction,
  searchTransaction,
  getTransaction,
};
