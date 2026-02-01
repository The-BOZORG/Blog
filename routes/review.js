import { Router } from 'express';
const router = Router();

import {
  createReview,
  approveReview,
  getPostReview,
  getUserReview,
  updateReview,
  deleteReview,
} from '../controllers/review.js';

router.post('/', createReview);

router.get('/post/:postId', getPostReview);

router.get('/user/:userId', getUserReview);

router.patch('/:id/approve', approveReview);

router.route('/:id').patch(updateReview).delete(deleteReview);

export default router;
