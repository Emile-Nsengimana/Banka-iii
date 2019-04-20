const transactionTable = `
CREATE TABLE IF NOT EXISTS
 transaction (
        transactionId serial primary key,
        createdOn date NOT NULL,
        type varchar(10) NOT NULL,
        accountNumber varchar(30),
        cashier integer,
        amount float,
        oldBalance float,
        newBalance float,
        foreign key(cashier) references users
    )`;
const makeTransaction = `insert into users (
    transactionId,
    createdOn,
    type,
    accountNumber,
    cashier,
    amount,
    oldBalance,
    newBalance
    )VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING returning *`;

const searchTransaction = 'select * from transaction where accountNumber = ($1)';
export default {
  transactionTable,
  makeTransaction,
  searchTransaction,
};
