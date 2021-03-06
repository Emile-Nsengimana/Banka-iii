import joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

class dataValidations {
  static userSignup(req, res, next) {
    const complexityOptions = {
      min: 8,
      max: 20,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 2,
    };

    const userSchema = joi.object().keys({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).required(),
      gender: joi.string().valid('male', 'female').required(),
      phoneNo: joi.string().trim().regex(/^[0-9]{10,13}$/).required(),
      email: joi.string().email().required(),
      password: new PasswordComplexity(complexityOptions).required(),
      confirmPassword: joi.string().required(),
      isAdmin: joi.boolean(),
    });
    const {
      firstName, lastName, gender, phoneNo, email, password, confirmPassword, isAdmin,
    } = req.body;
    if (!gender) {
      return res.status(400).json({
        status: 400,
        error: 'gender is required',
      });
    }
    const newUser = userSchema.validate({
      firstName,
      lastName,
      gender,
      phoneNo,
      email,
      password,
      confirmPassword,
      isAdmin,
    });
    if (newUser.error) {
      if (newUser.error.details[0].type === 'passwordComplexity.base') {
        return res.status(400).json({
          status: 400,
          error: 'password length must be 8 with atleast an upper, lower case letter, and a number',
        });
      }
      if (newUser.error.details[0].path[0] === 'phoneNo') {
        return res.status(400).json({
          status: 400,
          error: 'invalid phone number',
        });
      }
      return res.status(400).json({
        status: 400,
        error: newUser.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }

    req.user = newUser.value;
    next();
  }

  static validateCreateAccount(req, res, next) {
    const { type } = req.body;
    if (!type) {
      return res.status(400).json({ status: 401, error: 'type is required' });
    }

    const newAccountSchema = joi.object().keys({
      type: joi.string().valid('current', 'savings').required(),
    });

    const newAccount = newAccountSchema.validate({ type: type.toLowerCase().trim() });

    if (newAccount.error) {
      return res.status(400).json({ status: 401, error: newAccount.error.details[0].message.replace('"', ' ').replace('"', '') });
    }

    req.body = newAccount.value;
    next();
  }

  static validateChangeStatus(req, res, next) {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 401,
        error: 'account status is required',
      });
    }

    const newAccountSchema = joi.object().keys({
      status: joi.string().valid('dormant', 'draft', 'active').required(),
    });

    const newStatus = newAccountSchema.validate({ status: status.toLowerCase().trim() });

    if (newStatus.error) {
      return res.status(400).json({
        status: 401,
        error: newStatus.error.details[0].message.replace('"', ' ').replace('"', ''),
      });
    }

    req.body = newStatus.value;
    next();
  }

  static validateTransactionSchema(req, res, next) {
    const transactionSchema = joi.object().keys({
      amount: joi.number().positive().required(),
    });
    if (!req.body.amount) {
      return res.status(400).json({
        status: 400,
        error: 'the amount is required',
      });
    }
    if (typeof (req.body.amount) !== 'number' || req.body.amount < 0) {
      return res.status(400).json({
        status: 400,
        error: 'please provide invalid amount number',
      });
    }
    const checkAmount = transactionSchema.validate({
      amount: parseFloat(req.body.amount),
    });
    const { amount } = checkAmount.value;
    req.body = amount;
    next();
  }
}

export default dataValidations;
