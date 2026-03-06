import express from 'express';
import { getUsers } from '../controllers/user.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

//protecting the routes
router.use(protect);
//protecting the admin routes
router.use(authorize('admin'));

router.get('/', getUsers);

export default router;
