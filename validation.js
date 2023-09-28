const Joi = require('joi');
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('Client', 'Retailer' , 'Admin').required(),
});

// schema for login data
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});
module.exports = {
  signupSchema,
  loginSchema,
};
