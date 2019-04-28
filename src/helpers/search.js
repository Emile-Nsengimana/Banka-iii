import con from '../dbConnect';
import userModel from '../models/user';
import account from '../models/bankAccount';

class search {
  static async searchUser(email) {
    const u = con.query(userModel.searchUser, [email.toLowerCase()]);
    console.log(u);
    return u;
  }

  static async searchUserById(id) {
    return con.query(userModel.searchUserById, [id]);
  }

  static async searchAccount(accountNo) {
    return con.query(account.searchAccount, [accountNo]);
  }
}
export default search;
