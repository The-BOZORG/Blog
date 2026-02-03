import Post from '../models/post.js';
import catchAsync from '../utils/catchAsync.js';
import ErrorResponse from '../errors/customError.js';
import checkPermissions from '../utils/permission.js';

//GET all posts
//@access route
const allPosts = catchAsync(async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({ success: true, count: posts.length, data: posts });
});

//GET single post
//@access route
const singlePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name');
  if (!post) {
    throw new ErrorResponse('post not found', 404);
  }

  res.status(200).json({ success: true, data: post });
});

//CREATE post
//@protect route
const createPost = catchAsync(async (req, res) => {
  const { title, content } = req.body;

  const post = await Post.create({
    title,
    content,
    user: req.user.userId,
  });

  res.status(201).json({ success: true, data: post });
});

//UPDATE post (checkPermissions)
//@protect route
const updatePost = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ErrorResponse('post not found', 404);
  }

  checkPermissions(req.user, post.user);

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  await post.save();

  res.status(200).json({ success: true, data: post });
});

//DELETE post
//@protect route(only admin)
const deletePost = catchAsync(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    throw new ErrorResponse('post not found', 404);
  }

  res.status(200).json({ success: true, data: {} });
});

export { allPosts, singlePost, createPost, updatePost, deletePost };
