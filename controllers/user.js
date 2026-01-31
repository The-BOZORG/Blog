import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';

const showAllUsers = catchAsync(async (req, res) => {
  res.send('test');
});

const showSingleUser = catchAsync(async (req, res) => {
  res.send('test');
});

const updateUser = catchAsync(async (req, res) => {
  res.send('test');
});

const updatePasswordUser = catchAsync(async (req, res) => {
  res.send('test');
});

const deleteUser = catchAsync(async (req, res) => {
  res.send('test');
});

export {
  showAllUsers,
  showSingleUser,
  updateUser,
  updatePasswordUser,
  deleteUser,
};
