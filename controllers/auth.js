import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';

const register = catchAsync(async (req, res) => {
  res.send('test');
});

const login = catchAsync(async (req, res) => {
  res.send('test');
});

const logout = catchAsync(async (req, res) => {
  res.send('test');
});

export { register, login, logout };
