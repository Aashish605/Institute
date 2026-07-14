import express from 'express'
import { getAllEnrollments, createEnrollment, updateEnrollment, deleteEnrollment, getBatches } from '../Controller/Enrollment.controller.js'
import { isAdmin } from '../Middleware/adminAuth.js'

const router = express.Router();

router.get('/batches', isAdmin, getBatches);
router.get('/all', isAdmin, getAllEnrollments);
router.post('/', isAdmin, createEnrollment);
router.put('/:id', isAdmin, updateEnrollment);
router.delete('/:id', isAdmin, deleteEnrollment);

export default router;