import express from 'express';
import swaggerUI from 'swagger-ui-express';
import auth from '../authentication/auth';
import userControl from '../controllers/userController';
import accountControl from '../controllers/accountController';
import checkUser from '../helpers/checkUser';
import transactionControl from '../controllers/transactionController';
import schema from '../helpers/validations';
import swaggerDoc from '../../swagger.json';

const route = express.Router();
route.get('/', userControl.welcome);
route.use('/api/v2/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// ------------------------------------------- AUTHENTICATION -----------------------
route.post('/api/v2/auth/staff/signup', auth, checkUser.isAdmin, schema.userSignup, userControl.staffSignup);
route.post('/api/v2/auth/signup', schema.userSignup, userControl.signup);
route.post('/api/v2/auth/signin', schema.signIn, userControl.login);

// ------------------------------------------- ACCOUNT ------------------------------
route.post('/api/v2/accounts/', auth, schema.validateCreateAccount, accountControl.createAccount);
route.patch('/api/v2/account/:accountNo', auth, checkUser.isAdmin, schema.validateChangeStatus, accountControl.changeAccountStatus);
route.get('/api/v2/accounts', auth, checkUser.isStaff, accountControl.displayAccounts);
route.get('/api/v2/accounts/:accountNo', auth, checkUser.isOwner, accountControl.searchAccount);
route.delete('/api/v2/account/:accountNo', auth, checkUser.isStaff, accountControl.deleteAccount);
route.get('/api/v2/account/', auth, checkUser.isStaff, accountControl.getAccountsByStatus);
route.get('/api/v2/user/:email/accounts/', auth, checkUser.isAllowed, accountControl.getUserAccounts);

// ------------------------------------------- TRANSACTION --------------------------
route.post('/api/v2/transactions/:accountNo/debit', auth, checkUser.isCashier, schema.validateTransactionSchema, transactionControl.debitAccount);
route.post('/api/v2/transactions/:accountNo/credit', auth, checkUser.isCashier, schema.validateTransactionSchema, transactionControl.creditAccount);
route.get('/api/v2/accounts/:accountNo/transactions', auth, checkUser.isOwner, transactionControl.getAccountsTransactions);
route.get('/api/v2/transactions/:transactionId', auth, checkUser.isCashier, transactionControl.getTransaction);
route.get('/api/v2/transactions', auth, transactionControl.getUserTransactions);

export default route;
