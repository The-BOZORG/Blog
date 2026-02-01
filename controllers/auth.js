import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import ErrorResponse from '../errors/customError.js';
import { registerSchema, loginSchema } from '../utils/joi.js';
import { addRefreshToken } from '../utils/refreshToken.js';
import {
  createAccessJWT,
  createRefreshJWT,
  verifyRefreshToken,
} from '../utils/jwt.js';

//REGISTER
const register = catchAsync(async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new ErrorResponse('input error', 400);
  }

  const { username, email, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new ErrorResponse('email already exist', 400);
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({
    username,
    email,
    password,
    role,
    tokens: [],
  });

  const accessToken = createAccessJWT(user);
  const refreshToken = createRefreshJWT(user);

  await addRefreshToken(user, refreshToken, req.headers['user-agent']);

  res
    .status(200)
    .json({ msg: 'register success', user, accessToken, refreshToken });
});

//LOGIN
const login = catchAsync(async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new ErrorResponse('Input error', 400);
  }

  const user = await User.findOne({ email: req.body.email }).select(
    '+password',
  );
  if (!user) {
    throw new ErrorResponse('Invalid login credentials', 401);
  }

  const passwordCorrect = await user.matchPassword(req.body.password);
  if (!passwordCorrect) {
    throw new ErrorResponse('password not correct', 401);
  }

  const accessToken = createAccessJWT(user);
  const refreshToken = createRefreshJWT(user);

  await addRefreshToken(user, refreshToken, req.headers['user-agent']);

  res
    .status(200)
    .json({ message: 'Login successful', user, accessToken, refreshToken });
});

//LOGOUT
const logout = catchAsync(async (req, res) => {
  if (!req.user) {
    throw new ErrorResponse('User not found', 401);
  }

  await User.findByIdAndUpdate(req.user.userId, {
    $pull: {
      tokens: { userAgent: req.headers['user-agent'] },
    },
  });

  res.status(200).json({
    message: 'Logged out successfully from this device',
  });
});

//REFRESH TOKEN
const token = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new ErrorResponse('invalid refresh token', 401);
  }

  const exist = user.tokens.some((t) => t.refreshToken === refreshToken);
  if (!exist) {
    throw new ErrorResponse('invalid refresh token', 401);
  }

  const accessToken = createAccessJWT(user);

  res.status(200).json({ msg: 'access token generate', accessToken });
});

export { register, login, logout, token };
