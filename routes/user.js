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

router.route('/:id').get(showSingleUser).patch(updateUser).delete(deleteUser);

router.put('/:id/update-password', updatePasswordUser);

export default router;
