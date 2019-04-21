import joi from 'joi';
import PasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 20,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  requirementCount: 2,
};
const userSchema = joi.object().keys({
  firstName: joi.string().alphanum().min(3).required(),
  lastName: joi.string().alphanum().min(3).required(),
  gender: joi.string().valid('male', 'female').required(),
  phoneNo: joi.string().required(),
  email: joi.string().email().required(),
  password: new PasswordComplexity(complexityOptions),
  type: joi.string().valid('client', 'staff').required(),
  isAdmin: joi.boolean(),
});

export default userSchema;
