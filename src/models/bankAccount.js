const bankAccountTable = `
CREATE TABLE IF NOT EXISTS
 bankAccount (
        accountId varchar(50) primary key,
        accountNumber varchar(30) NOT NULL,
        createdOn date NOT NULL,
        owner integer UNIQUE,
        type varchar(10) NOT NULL,
        status varchar(10),
        balance boolean DEFAULT false,
        foreign key(owner) REFERENCES users
    )`;
const createAccount = `insert into users (
        accountId,
        accountNumber,
        createdOn,
        owner,
        type,
        status,
        balance
    )VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;

const removeAccount = 'delete from bankAccount where accountNumber = ($1)';
const searchAccount = 'select * from bankAccount where accountNumber = ($1)';
export default {
  bankAccountTable,
  createAccount,
  removeAccount,
  searchAccount,
};
