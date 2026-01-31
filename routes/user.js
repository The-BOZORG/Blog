import { Router } from 'express';
const router = Router();

import {
  showAllUsers,
  showSingleUser,
  updateUser,
  updatePasswordUser,
  deleteUser,
} from '../controllers/user.js';

router.route('/').get(showAllUsers);

router
  .route('/:id')
  .get(showSingleUser)
  .patch(updateUser)
  .put(updatePasswordUser)
  .delete(deleteUser);

export default router;
