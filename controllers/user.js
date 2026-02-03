import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';
import ErrorResponse from '../errors/customError.js';
import checkPermissions from '../utils/permission.js';
import { addRefreshToken } from '../utils/refreshToken.js';
import { createAccessJWT, createRefreshJWT } from '../utils/jwt.js';

//Get all user
//@private route(only admin)
const showAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.status(200).json({ success: true, data: users });
});

//Get single user (checkPermissions)
//@private route
const showSingleUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    throw new ErrorResponse('no user found with this id', 404);
  }
  checkPermissions(req.user, user._id);
  res.status(200).json({ data: user });
});

//Get correct logged user
//@private route
const showUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.status(200).json({ success: true, data: user });
});

//Update user
//@private route
const updateUser = catchAsync(async (req, res) => {
  const { username, email } = req.body;

  if (!email || !username) {
    throw new ErrorResponse('please provide all value', 400);
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new ErrorResponse('user not found', 404);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser._id.toString() !== req.user.userId) {
    throw new ErrorResponse('email already in use', 400);
  }

  user.email = email;
  user.username = username;

  await user.save();

  const accessToken = createAccessJWT(user);
  const refreshToken = createRefreshJWT(user);

  await addRefreshToken(user, refreshToken, req.headers['user-agent']);

  res.status(200).json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    accessToken,
    refreshToken,
  });
});

//Update password user
//@private route
const updatePasswordUser = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ErrorResponse('please provide current and new password', 400);
  }

  const user = await User.findById(req.user.userId).select('+password');

  if (!user) {
    throw new ErrorResponse('user not found', 404);
  }

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    throw new ErrorResponse('password is wrong', 401);
  }

  if (currentPassword === newPassword) {
    throw new ErrorResponse('new password must be different', 400);
  }

  user.password = newPassword;
  await user.save();

  const accessToken = createAccessJWT(user);
  const refreshToken = createRefreshJWT(user);

  await addRefreshToken(user, refreshToken, req.headers['user-agent']);

  res.status(200).json({
    message: 'password updated success',
    accessToken,
    refreshToken,
  });
});

export {
  showAllUsers,
  showUser,
  showSingleUser,
  updateUser,
  updatePasswordUser,
};
