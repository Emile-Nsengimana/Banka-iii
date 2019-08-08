import con from '../dbConnect';
import userModel from '../models/user';
import account from '../models/bankAccount';

class search {
  static async searchUser(email) {
    const searchByEmail = con.query(userModel.searchUser, [email.toLowerCase()]);
    return searchByEmail;
  }

  static async searchUserById(id) {
    const searchById = con.query(userModel.searchUserById, [id]);
    return searchById;
  }

  static async searchAccount(accountNo) {
    const findAccount = con.query(account.searchAccount, [accountNo]);
    return findAccount;
  }
}
export default search;
