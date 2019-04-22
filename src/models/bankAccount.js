const bankAccountTable = `
CREATE TABLE IF NOT EXISTS
 bankAccount (
        accountId serial primary key,
        accountNumber varchar(50) NOT NULL,
        createdOn date NOT NULL,
        owner integer,
        type varchar(10) NOT NULL,
        status varchar(10),
        balance float,
        foreign key(owner) REFERENCES users
    )`;
const createAccount = `insert into bankAccount (
        accountNumber,
        createdOn,
        owner,
        type,
        status,
        balance
    )VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT DO NOTHING returning *`;

const removeAccount = 'delete from bankAccount where accountNumber = ($1)';
const searchAccount = 'select * from bankAccount where accountNumber = ($1)';
const userAccounts = 'select * from bankAccount where owner = ($1)';
const userAccountsNo = 'select accountnumber from bankAccount where owner = ($1)';
const changeAccountStatus = 'update bankaccount set status = ($1) where accountnumber = ($2)';
const deleteAccount = 'delete from bankaccount where accountnumber = ($1)';
const getAllAccount = 'select * from bankaccount';
const updateAccount = 'update bankaccount set balance = ($1) where accountnumber = ($2)';
const accountStatus = 'select * from bankaccount where status = ($1)';
const getUserAccounts = 'select accountnumber from bankaccount where owner = ($1)';

export default {
  bankAccountTable,
  createAccount,
  removeAccount,
  searchAccount,
  userAccounts,
  userAccountsNo,
  changeAccountStatus,
  deleteAccount,
  getAllAccount,
  updateAccount,
  accountStatus,
  getUserAccounts,
};
