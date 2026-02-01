import joi from 'joi';

const registerSchema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().min(6).max(30).email().required(),
  password: joi.string().min(6).max(20).required(),
});

const loginSchema = joi.object({
  email: joi.string().min(6).max(30).email().required(),
  password: joi.string().min(6).max(20).required(),
});

export { registerSchema, loginSchema };
