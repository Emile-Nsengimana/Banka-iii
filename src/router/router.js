import express from 'express';
import auth from '../authentication/auth';
import userControl from '../controllers/userController';
import accountControl from '../controllers/accountController';
import checkUser from '../helpers/checkUser';
import transactionControl from '../controllers/transactionController';

const route = express.Router();
route.get('/', userControl.welcome);
// ------------------------------------------- AUTHENTICATION -----------------------
route.post('/api/v2/auth/signup', userControl.signup);
route.post('/api/v2/auth/login', userControl.login);

// ------------------------------------------- ACCOUNT ------------------------------
route.post('/api/v2/accounts', auth, accountControl.createAccount);
route.patch('/api/v2/account/:accountNo', auth, checkUser.isAdmin, accountControl.changeAccountStatus);
route.get('/api/v2/accounts', auth, checkUser.isStaff, accountControl.displayAccounts);
route.get('/api/v2/accounts/:accountNo', auth, checkUser.isOwner, accountControl.searchAccount);
route.delete('/api/v2/account/:accountNo', auth, checkUser.isStaff, accountControl.deleteAccount);
route.get('/api/v2/accounts/', auth, checkUser.isStaff, accountControl.getAccountsByStatus);
route.get('/api/v2/user/:email/accounts/', auth, checkUser.isAllowed, accountControl.getUserAccounts);

// ------------------------------------------- TRANSACTION --------------------------
route.post('/api/v2/transactions/:accountNo/debit', auth, checkUser.isCashier, transactionControl.debitAccount);
route.post('/api/v2/transactions/:accountNo/credit', auth, checkUser.isCashier, transactionControl.creditAccount);
route.get('/api/v2/accounts/:accountNo/transactions', auth, checkUser.isOwner, transactionControl.getAccountsTransactions);
route.get('/api/v2/transactions/:transactionId', auth, checkUser.isCashier, transactionControl.getTransaction);

export default route;
