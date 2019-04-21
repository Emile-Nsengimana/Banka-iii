import joi from 'joi';

const transactionSchema = joi.object().keys({
  id: joi.number().positive().required(),
  createdOn: joi.date().required(),
  type: joi.string().alphanum().min(5).required(),
  accountNumber: joi.string().required(),
  cashier: joi.number().positive().required(),
  amount: joi.number().positive().required(),
  oldBalance: joi.number().required(),
  newBalance: joi.number().required(),
});
export default transactionSchema;
