/* eslint-disable max-len */
import moment from 'moment';
import uuid from 'uuid/v4';
import schema from './validation/bankAccountSchema';
import search from '../helpers/search';
import con from '../../dbConnect';
import account from '../models/bankAccount';
import schemaStatus from './validation/accountStatusSchema';

class accountController {
  // ======================================== BANK ACCOUNTS ====================================
  static async createAccount(req, res) {
    const accountOwner = await search.searchUserById(req.user.id);
    const newAccount = schema.validate({
      accountNumber: uuid().toUpperCase(),
      createdOn: moment.utc().format(),
      owner: req.user.id,
      type: req.body.type.toLowerCase(),
      status: 'active',
      balance: 0,
    });
    if (!newAccount.error) {
      const createAccount = await con.query(account.createAccount, [newAccount.value.accountNumber, newAccount.value.createdOn, newAccount.value.owner, newAccount.value.type, newAccount.value.status, newAccount.value.balance]);
      return res.status(201).json({
        status: 201,
        data: {
          accountNumber: createAccount.rows[0].accountnumber,
          firstName: accountOwner.rows[0].firstname,
          lastName: accountOwner.rows[0].lastname,
          email: accountOwner.rows[0].email,
          type: req.body.type.toLowerCase(),
          openingBalance: 0,
        },
      });
    } return res.status(400).json({ status: 400, error: newAccount.error.details[0].message.replace('"', '').replace('"', '') });
  }

  // ================================== CHANGE ACCOUNT STATUS ==============================
  static async changeAccountStatus(req, res) {
    const checkStatus = schemaStatus.validate({ status: req.body.status.toLowerCase() });
    if (checkStatus.error) return res.status(400).json({ status: 400, error: 'account can only be change to dormant, draft, or active' });
    const searchAccount = await search.searchAccount(req.params.accountNo);
    if (searchAccount.rowCount !== 0) {
      const updateAccountStatus = await con.query(account.changeAccountStatus, [req.body.status.toLowerCase(), req.params.accountNo]);
      if (updateAccountStatus.rowCount !== 0) {
        const updatedAccount = await search.searchAccount(req.params.accountNo);
        return res.status(200).json({ status: 200, data: { accountNumber: updatedAccount.rows[0].accountnumber, status: updatedAccount.rows[0].status } });
      }
    } return res.status(404).json({ status: 404, message: 'account not found' });
  }

  // ================================== DELETE ACCOUNT ==============================
  static async deleteAccount(req, res) {
    const deleteAccount = await con.query(account.deleteAccount, [req.params.accountNo]);
    if (!deleteAccount.error) return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
    return res.status(404).json({ status: 404, message: 'Account not found' });
  }

  // ================================== DISPLAY ACCOUNTS ==============================
  static async displayAccouts(req, res) {
    const allAccounts = await con.query(account.getAllAccount);
    if (!allAccounts.error) return res.status(200).json({ status: 200, data: allAccounts.rows });
    return res.status(401).json({ status: 500, message: 'server error please try again later' });
  }

  // ================================== SEARCH ACCOUNT =================================
  static async searchAccount(req, res) {
    const getAccount = await search.searchAccount(req.params.accountNo);
    if (getAccount.rowCount !== 0) return res.status(200).json({ status: 200, data: getAccount.rows[0] });
    return res.status(404).json({ status: 404, message: 'account not found' });
  }
}
export default accountController;
