import joi from 'joi';

const bankAccounntSchema = joi.object().keys({
  accountNumber: joi.string().required(),
  createdOn: joi.date().required(),
  owner: joi.number().positive().required(),
  type: joi.string().valid('current', 'savings').required(),
  status: joi.string().valid('dormant', 'active', 'draft').required(),
  balance: joi.number().required(),
});
export default bankAccounntSchema;
