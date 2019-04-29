import moment from 'moment';
import uuid from 'uuid/v4';
import search from '../helpers/search';
import con from '../dbConnect';
import account from '../models/bankAccount';

class accountController {
  // ======================================== BANK ACCOUNTS ====================================
  static async createAccount(req, res) {
    const accountOwner = await search.searchUserById(req.user.id);
    if (accountOwner.rowCount === 0) {
      return res.status(500).json({
        status: 500,
        error: 'server error',
      });
    }
    const newAccount = {
      accountNumber: uuid().toUpperCase(),
      createdOn: moment.utc().format(),
      owner: req.user.id,
      type: req.body.type,
      status: 'active',
      balance: 0,
    };
    const {
      accountNumber, createdOn, owner, type, status, balance,
    } = newAccount;
    const createAccount = await con.query(account.createAccount,
      [accountNumber, createdOn, owner, type, status, balance]);
    if (createAccount.rowCount === 0) {
      return res.status(500).json({
        status: 500, error: 'server error',
      });
    }
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: createAccount.rows[0].accountnumber,
        firstName: accountOwner.rows[0].firstname,
        lastName: accountOwner.rows[0].lastname,
        email: accountOwner.rows[0].email,
        type: req.body.type.toLowerCase(),
        createdOn: createAccount.rows[0].createdon,
        status: createAccount.rows[0].status,
        openingBalance: 0,
      },
    });
  }

  // ================================== CHANGE ACCOUNT STATUS ==============================
  static async changeAccountStatus(req, res) {
    const searchAccount = await search.searchAccount(req.params.accountNo);
    if (searchAccount.rowCount !== 0) {
      if (searchAccount.rows[0].status === req.body.status) {
        return res.status(409).json({
          status: 409,
          error: `the accounts is already ${req.body.status}`,
        });
      }
      const updateAccountStatus = await con.query(account.changeAccountStatus,
        [req.body.status, req.params.accountNo]);
      if (updateAccountStatus.rowCount !== 0) {
        const updatedAccount = await search.searchAccount(req.params.accountNo);
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: updatedAccount.rows[0].accountnumber,
            status: updatedAccount.rows[0].status,
          },
        });
      }
    } return res.status(404).json({
      status: 404,
      message: 'account not found',
    });
  }

  // ================================== DELETE ACCOUNT ==============================
  static async deleteAccount(req, res) {
    if (!req.params.accountNo) {
      return res.status(400).json({
        status: 400,
        error: 'please provide the account number',
      });
    }
    const searchAccount = await con.query(account.searchAccount, [req.params.accountNo]);
    if (searchAccount.rowCount !== 0) {
      if (searchAccount.rows[0].balance > 0) {
        return res.status(403).json({
          status: 403,
          message: 'you can\'t delete this account',
        });
      }
      const deleteAccount = await con.query(account.deleteAccount, [req.params.accountNo]);
      if (deleteAccount.rowCount !== 0) {
        return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
      }
    }
    return res.status(404).json({ status: 404, message: 'Account not found' });
  }

  // ================================== DISPLAY ACCOUNTS ==============================
  static async displayAccounts(req, res) {
    const allAccounts = await con.query(account.getAllAccount);
    if (!allAccounts.error) {
      return res.status(200).json({
        status: 200,
        data: allAccounts.rows,
      });
    }
    return res.status(401).json({
      status: 500,
      message: 'server error please try again later',
    });
  }

  // ================================== SEARCH ACCOUNT =================================
  static async searchAccount(req, res) {
    const getAccount = await search.searchAccount(req.params.accountNo);
    if (getAccount.rowCount === 0) {
      return res.status(404).json({
        status: 404, message: 'account not found',
      });
    }
    const getOwner = await search.searchUserById(getAccount.rows[0].owner);
    if (getAccount.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: {
          accountId: getAccount.rows[0].accountid,
          accountNo: getAccount.rows[0].accountno,
          createdOn: getAccount.rows[0].createdon,
          ownerEmail: getOwner.rows[0].email,
          type: getAccount.rows[0].type,
          status: getAccount.rows[0].status,
          balance: getAccount.rows[0].balance,
        },
      });
    }
    return res.status(404).json({
      status: 404,
      message: 'account not found',
    });
  }

  // ================================== DISPLAY ACCOUNTS BY STATUS ==============================
  static async getAccountsByStatus(req, res) {
    const accountsStatus = await con.query(account.accountStatus, [req.query.status]);
    if (accountsStatus.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: accountsStatus.rows,
      });
    }
    return res.status(401).json({
      status: 404,
      message: `there is no account with status ${req.query.status}`,
    });
  }

  // ================================== DISPLAY USER ACCOUNTS =============================
  static async getUserAccounts(req, res) {
    const getUser = await search.searchUser(req.params.email);
    const getUserAccounts = await con.query(account.userAccounts, [getUser.rows[0].userid]);
    if (getUserAccounts.rowCount !== 0) {
      return res.status(200).json({
        status: 200,
        data: getUserAccounts.rows,
      });
    }
    return res.status(401).json({
      status: 404,
      message: `no account fund for user with email ${req.params.email}`,
    });
  }
}
export default accountController;
