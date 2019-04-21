import moment from 'moment';
import schema from '../controllers/validation/transactionSchema';
import transactionModal from '../modals/transactionModal';

class transactionHelper {
  static makeTransaction(type, amount, userId, accountNo, oldBal, newBal) {
    const addTransaction = schema.validate({
      id: transactionModal.length + 1,
      createdOn: moment.utc().format(),
      type,
      accountNumber: accountNo,
      cashier: userId,
      amount,
      oldBalance: oldBal,
      newBalance: newBal,
    });
    return addTransaction;
  }

  static updateBankAccount(account, bal) {
    const updatedAccount = {
      id: account.id,
      accountNumber: account.accountNumber,
      createdOn: account.createdOn,
      owner: account.owner,
      type: account.type,
      status: account.status,
      balance: bal,
    };
    return updatedAccount;
  }
}
export default transactionHelper;
