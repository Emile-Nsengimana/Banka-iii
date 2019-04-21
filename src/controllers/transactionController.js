/* eslint-disable max-len */
import moment from 'moment';
import transaction from '../models/transaction';
import search from '../helpers/search';
import bankAccount from '../models/bankAccount';
import con from '../../dbConnect';

class transactionController {
  // ========================================= DEBIT ACCOUNT ====================================
  static async debitAccount(req, res) {
    const { amount } = req.body;
    const account = await search.searchAccount(req.params.accountNo);
    if (account.rowCount !== 0) {
      if (account.rows[0].balance < amount) return res.status(406).json({ status: 406, message: 'insufficient fund' });
      const debitAccount = await con.query(bankAccount.updateAccount, [account.rows[0].balance - amount, req.params.accountNo]);
      if (debitAccount.rowCount !== 0) {
        const newTransaction = await con.query(transaction.makeTransaction, [moment.utc().format(), 'debit', req.params.accountNo, req.user.rows[0].userid, amount, account.rows[0].balance, account.rows[0].balance - amount]);
        if (newTransaction.rowCount !== 0) return res.status(200).json({ status: 200, data: newTransaction.rows[0] });
        return res.status(400).json({ status: 400, error: newTransaction.error });
      }
    } return res.status(404).json({ status: 404, error: 'account not found' });
  }

  // ========================================= CREDIT ACCOUNT ====================================
  static async creditAccount(req, res) {
    const { amount } = req.body;
    const account = await search.searchAccount(req.params.accountNo);
    if (account.rowCount !== 0) {
      const creditAccount = await con.query(bankAccount.updateAccount, [account.rows[0].balance + amount, req.params.accountNo]);
      if (creditAccount.rowCount !== 0) {
        const newTransaction = await con.query(transaction.makeTransaction, [moment.utc().format(), 'credit', req.params.accountNo, req.user.rows[0].userid, amount, account.rows[0].balance, account.rows[0].balance + amount]);
        if (newTransaction.rowCount !== 0) return res.status(200).json({ status: 200, data: newTransaction.rows[0] });
        return res.status(400).json({ status: 400, error: newTransaction.error });
      }
    } return res.status(404).json({ status: 404, error: 'account not found' });
  }
}
export default transactionController;