import Post from '../models/post.js';
import catchAsync from '../utils/catchAsync.js';

const allPosts = catchAsync(async (req, res) => {
  res.send('test');
});

const singlePost = catchAsync(async (req, res) => {
  res.send('test');
});

const createPost = catchAsync(async (req, res) => {
  res.send('test');
});

const updatePost = catchAsync(async (req, res) => {
  res.send('test');
});

const deletePost = catchAsync(async (req, res) => {
  res.send('test');
});

export { allPosts, singlePost, createPost, updatePost, deletePost };
