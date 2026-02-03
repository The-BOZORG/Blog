import { Router } from 'express';
const router = Router();

import {
  createReview,
  getPostReview,
  getUserReview,
  deleteReview,
} from '../controllers/review.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router.post('/', authenticateUser, createReview);

router.get('/posts/:postId', authenticateUser, getPostReview);

router.get('/users/:userId', authenticateUser, getUserReview);

router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteReview,
);

export default router;
