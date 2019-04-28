import con from '../dbConnect';
import userModel from '../models/user';
import account from '../models/bankAccount';

class search {
  static async searchUser(email) {
    return con.query(userModel.searchUser, [email.toLowerCase()]);
  }

  static async searchUserById(id) {
    return con.query(userModel.searchUserById, [id]);
  }

  static async searchAccount(accountNo) {
    return con.query(account.searchAccount, [accountNo]);
  }
}
export default search;
