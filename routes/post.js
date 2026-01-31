import { Router } from 'express';
const router = Router();

import {
  allPosts,
  singlePost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';

router.route('/').post(createPost).get(allPosts);

router.route('/:id').get(singlePost).patch(updatePost).delete(deletePost);

export default router;
