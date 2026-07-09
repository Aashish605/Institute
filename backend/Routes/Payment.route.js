import express from 'express';
import { submitReceipt, getMyCourses, getAllReceipts, updateReceiptStatus } from '../Controller/Payment.controller.js';
import { isAdmin } from '../Middleware/adminAuth.js';

const router = express.Router();

router.post('/receipt', submitReceipt);
router.get('/my-courses', getMyCourses);
router.get('/receipts', isAdmin, getAllReceipts);
router.patch('/receipt/:id', isAdmin, updateReceiptStatus);

export default router;