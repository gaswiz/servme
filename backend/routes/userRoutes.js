// userRoutes.js
import express from 'express';
import { getUserById, getAllUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);

export default router;
