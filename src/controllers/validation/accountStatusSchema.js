import joi from 'joi';

const checkStatus = joi.object().keys({
  status: joi.string().valid('dormant', 'active', 'draft').required(),
});
export default checkStatus;
