import con from '../dbConnect';
import user from '../models/user';
import bankAccount from '../models/bankAccount';

class checkUser {
  static async isAdmin(req, res, next) {
    const userFund = await con.query(user.searchUserById, [req.user.id]);
    if (userFund.rowCount === 0) {
      return res.status(401).json({ status: 401, error: 'please login or signup' });
    }
    if (userFund.rows[0].isadmin === false) {
      return res.status(401).json({ status: 401, error: 'permission denied' });
    }
    req.user = userFund;
    next();
  }

  static async isStaff(req, res, next) {
    const userFund = await con.query(user.searchUserById, [req.user.id]);
    if (userFund.rowCount === 0) {
      return res.status(404).json({ status: 401, error: 'please login or signup' });
    }
    if (userFund.rows[0].type !== 'staff') {
      return res.status(403).json({ status: 403, error: 'permission denied' });
    }
    req.user = userFund;
    next();
  }

  static async isCashier(req, res, next) {
    const userFund = await con.query(user.searchUserById, [req.user.id]);
    if (userFund.rowCount === 0) {
      return res.status(401).json({ status: 401, error: 'please login or signup' });
    }
    if (userFund.rows[0].type === 'staff' && userFund.rows[0].isadmin === true) {
      return res.status(403).json({ status: 403, error: 'only cashier is allowed to debit/credit account' });
    }
    if (userFund.rows[0].type === 'client') {
      return res.status(403).json({ status: 403, error: 'you are not allowed to perfom this action' });
    }

    req.user = userFund;
    next();
  }

  static async isOwner(req, res, next) {
    const checkOwner = await con.query(bankAccount.searchAccount, [req.params.accountNo]);
    const getUser = await con.query(user.searchUserById, [req.user.id]);
    if (checkOwner.rowCount !== 0) {
      if (checkOwner.rows[0].owner !== req.user.id && getUser.rows[0].type !== 'staff') {
        return res.status(403).json({ status: 403, message: 'access denied' });
      }
    }
    next();
  }

  static async isAllowed(req, res, next) {
    const getUser = await con.query(user.searchUser, [req.params.email]);
    const getUser2 = await con.query(user.searchUserById, [req.user.id]);
    if (getUser.rows[0].userid !== req.user.id && getUser2.rows[0].type !== 'staff') {
      return res.status(401).json({ status: 200, message: 'access denied' });
    }
    next();
  }
}
export default checkUser;
