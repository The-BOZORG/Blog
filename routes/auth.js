import { Router } from 'express';
const router = Router();

import { register, login, logout, token } from '../controllers/auth.js';

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/token', token);

export default router;
