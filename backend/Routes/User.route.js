import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../Controller/User.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

const router = express.Router();

router.get('/all', isAdmin, getAllUsers);
router.get('/:id', isAdmin, getUserById);
router.patch('/:id', isAdmin, updateUser);
router.delete('/:id', isAdmin, deleteUser);

export default router;
