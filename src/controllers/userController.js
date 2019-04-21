/* eslint-disable max-len */
/* eslint-disable no-shadow */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/user';
import schema from './validation/userSchema';
import loginSchema from './validation/loginSchema';
import msg from '../helpers/welcome';
import con from '../../dbConnect';
import search from '../helpers/search';

dotenv.config();
class userController {
  static welcome(req, res) {
    return res.send(msg);
  }

  // ================================================== SIGNUP =====================================
  static async signup(req, res) {
    const {
      firstName, lastName, gender, phoneNo, email, password, retype, type,
    } = req.body;
    const findUser = await search.searchUser(email);
    if (findUser.rowCount !== 0) return res.status(400).json({ status: 400, error: 'user with the same email already exist' });
    if (password !== retype) return res.status(400).json({ status: 400, error: 'password doesn\'t match' });
    const newUser = schema.validate({
      firstName, lastName, gender: gender.toLowerCase(), phoneNo, email: email.toLowerCase(), password, type: type.toLowerCase(),
    });
    if (!newUser.error) {
      const addUser = await con.query(userModel.addUser, [firstName, lastName, gender.toLowerCase(), phoneNo, email.toLowerCase(), password, type.toLowerCase(), false]);
      if (!addUser.error) {
        const jwtoken = jwt.sign({ id: addUser.rows[0].userid }, process.env.NEVERMIND);
        return res.status(201).json({
          status: 201,
          data: {
            token: jwtoken, id: addUser.rows[0].userid, firstName, lastName, email: email.toLowerCase(), type: type.toLowerCase(), isAdmin: addUser.rows[0].isadmin,
          },
        });
      }
    }
    if (newUser.error.details[0].type === 'passwordComplexity.base') {
      return res.status(400).json({ status: 400, error: 'password length must be 8 with atleast an upper, lower case letter, and a number,' });
    } return res.status(400).json({ status: 400, error: newUser.error.details[0].message.replace('"', ' ').replace('"', '') });
  }

  // ================================================== LOGIN =====================================
  static async login(req, res) {
    const { email, password } = req.body;
    const credentials = loginSchema.validate({ email, password });
    if (!credentials.error) {
      const findUser = await search.searchUser(email);
      if (findUser.rowCount !== 0) {
        if (findUser.rows[0].password === password) {
          const jwtoken = jwt.sign({ id: findUser.rows[0].userid }, process.env.NEVERMIND);
          const user = findUser.rows[0];
          return res.status(200).json({
            status: 200,
            data: { token: jwtoken, user },
          });
        } return res.status(401).json({ status: 400, message: 'incorrect password' });
      } return res.status(404).json({ status: 404, message: 'incorrect email' });
    } return res.status(400).json({ status: 400, error: credentials.error.details[0].message.replace('"', ' ').replace('"', '') });
  }
}
export default userController;
