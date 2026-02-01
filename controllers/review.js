import Review from '../models/review.js';
import catchAsync from '../utils/catchAsync.js';

const createReview = catchAsync(async (req, res) => {
  res.send('test');
});

const approveReview = catchAsync(async (req, res) => {
  res.send('test');
});

const getPostReview = catchAsync(async (req, res) => {
  res.send('test');
});

const getUserReview = catchAsync(async (req, res) => {
  res.send('test');
});

const updateReview = catchAsync(async (req, res) => {
  res.send('test');
});

const deleteReview = catchAsync(async (req, res) => {
  res.send('test');
});

export {
  createReview,
  approveReview,
  getPostReview,
  getUserReview,
  updateReview,
  deleteReview,
};
