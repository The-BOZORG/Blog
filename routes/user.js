import { Router } from 'express';
const router = Router();

import {
  showAllUsers,
  showUser,
  showSingleUser,
  updateUser,
  updatePasswordUser,
} from '../controllers/user.js';

import {
  authenticateUser,
  authorizePermissions,
} from '../middlewares/authitication.js';

router.get(
  '/showAllUsers',
  authenticateUser,
  authorizePermissions('admin'),
  showAllUsers,
);

router.get('/me', authenticateUser, showUser);

router.get('/:id', authenticateUser, showSingleUser);
router.patch('/:id', authenticateUser, updateUser);
router.put('/update-password/:id', authenticateUser, updatePasswordUser);

export default router;
