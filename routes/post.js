import { Router } from 'express';
const router = Router();

import {
  allPosts,
  singlePost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router.route('/').post(authenticateUser, createPost).get(allPosts);

router
  .route('/:id')
  .get(singlePost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, authorizePermissions('admin'), deletePost);

export default router;
