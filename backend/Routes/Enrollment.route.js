import express from 'express'
import { getAllEnrollments, createEnrollment, deleteEnrollment } from '../Controller/Enrollment.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

const router = express.Router();

router.get('/all', isAdmin, getAllEnrollments);
router.post('/', isAdmin, createEnrollment);
router.delete('/:id', isAdmin, deleteEnrollment);

export default router;
