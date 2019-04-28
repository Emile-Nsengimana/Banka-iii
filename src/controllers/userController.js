import dotenv from 'dotenv';
import crypt from 'bcrypt';
import jwt from '../helpers/tokenGenerator';
import userModel from '../models/user';
import msg from '../helpers/welcome';
import con from '../dbConnect';
import search from '../helpers/search';

dotenv.config();
class userController {
  static welcome(req, res) {
    return res.send(msg);
  }

  // ========================================== STAFF SIGNUP =====================================
  static async staffSignup(req, res) {
    const {
      firstName, lastName, gender, phoneNo, email, password, confirmPassword,
    } = req.user;
    const findUser = await search.searchUser(req.user.email);
    if (findUser.rowCount !== 0) {
      return res.status(409).json({ status: 409, error: 'user with the same email already exist' });
    } if (password !== confirmPassword) {
      return res.status(400).json({ status: 400, error: 'password doesn\'t match' });
    }
    const passkey = crypt.hashSync(password, 10);
    const addUser = await con.query(userModel.addUser,
      [firstName, lastName, gender, phoneNo, email, passkey, false]);
    if (addUser.rowCount !== 0) {
      const token = jwt.signToken(addUser.rows[0]);
      return res.status(201).json({
        status: 201,
        data: {
          token,
          userid: addUser.rows[0].userid,
          firstname: addUser.rows[0].firstname,
          lastname: addUser.rows[0].lastname,
          gender: addUser.rows[0].gender,
          phonenumber: addUser.rows[0].phonenumber,
          email: addUser.rows[0].email,
          type: addUser.rows[0].type,
          isadmin: addUser.rows[0].isadmin,
        },
      });
    } return res.status(400).json({ status: 500, error: 'server error' });
  }

  // ================================================== SIGNUP =====================================
  static async signup(req, res) {
    const {
      firstName, lastName, gender, phoneNo, email, password, confirmPassword,
    } = req.user;
    try {
      const findUser = await search.searchUser(req.user.email);
      if (findUser.rowCount !== 0) {
        return res.status(409).json({ status: 409, error: 'user with the same email already exist' });
      } if (password !== confirmPassword) {
        return res.status(400).json({ status: 400, error: 'password doesn\'t match' });
      }
      const passkey = crypt.hashSync(password, 10);
      const addUser = await con.query(userModel.addUser,
        [firstName, lastName, gender, phoneNo, email, passkey, 'client', false]);
      if (addUser.rowCount !== 0) {
        const token = jwt.signToken(addUser.rows[0]);
        return res.status(201).json({
          status: 201,
          data: {
            token,
            userid: addUser.rows[0].userid,
            firstname: addUser.rows[0].firstname,
            lastname: addUser.rows[0].lastname,
            gender: addUser.rows[0].gender,
            phonenumber: addUser.rows[0].phonenumber,
            email: addUser.rows[0].email,
            type: addUser.rows[0].type,
            isadmin: addUser.rows[0].isadmin,
          },
        });
      } return res.status(500).json({ status: 500, error: 'server error' });
    } catch (Error) {
      return res.status(Error.status).json({
        error: res.body,
      });
    }
  }

  // ================================================== LOGIN =====================================
  static async login(req, res) {
    const findUser = await search.searchUser(req.user.email);
    if (findUser.rowCount !== 0) {
      const passkey = crypt.compareSync(req.user.password, findUser.rows[0].password);
      if (passkey) {
        const jwtoken = jwt.signToken(findUser.rows[0]);
        return res.status(200).json({
          status: 200,
          data: {
            token: jwtoken,
            userId: findUser.rows[0].userid,
            firstName: findUser.rows[0].firstName,
            lastName: findUser.rows[0].lastname,
            email: findUser.rows[0].email,
            type: findUser.rows[0].type,
            isAdmin: findUser.rows[0].isadmin,
          },
        });
      } return res.status(401).json({ status: 400, message: 'incorrect password' });
    } return res.status(404).json({ status: 404, message: 'incorrect email' });
  }
}
export default userController;
