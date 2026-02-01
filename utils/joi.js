import joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(30).email().required(),
  password: Joi.string().min(6).max(20).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).max(30).email().required(),
  password: Joi.string().min(6).max(20).required(),
});
