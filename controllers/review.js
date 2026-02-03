import Review from '../models/review.js';
import Post from '../models/post.js';
import catchAsync from '../utils/catchAsync.js';
import ErrorResponse from '../errors/customError.js';

//CREATE review
//@protect route
const createReview = catchAsync(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    throw new ErrorResponse('not found post with this id', 404);
  }
  const review = await Review.create({
    post: req.params.postId,
    user: req.user.userId,
    comment: req.body.comment,
  });
  res.status(201).json({ success: true, data: review });
});

//GET post review
//@protect route
const getPostReview = catchAsync(async (req, res) => {
  const review = await Review.findById({
    post: req.params.postId,
    isApproved: true,
  }).populate({
    path: 'user',
    select: 'username',
  });
  if (!review) {
    throw new ErrorResponse('not found this review', 404);
  }
  res.status(200).json({ success: true, data: review });
});

//GET user review
//@protect route
const getUserReview = catchAsync(async (req, res) => {
  const review = await Review.findById({ user: req.params.userId }).populate({
    path: 'post',
    select: 'title content',
  });
  if (!review) {
    throw new ErrorResponse('not found this review', 404);
  }
  res.status(200).json({ success: true, data: review });
});

//DELETE review
//@protect route(only admin)
const deleteReview = catchAsync(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new ErrorResponse('not found this review', 404);
  }
  res.status(200).json({ success: true, data: {} });
});

export { createReview, getPostReview, getUserReview, deleteReview };
