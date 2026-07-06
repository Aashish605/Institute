import express from 'express';
import { submitReceipt, getAllReceipts, updateReceiptStatus } from '../Controller/PaymentReceipt.controller.js';
import { isAdmin } from '../Middleware/adminAuth.js';

const router = express.Router();

router.post('/receipt', submitReceipt);
router.get('/receipts', isAdmin, getAllReceipts);
router.patch('/receipt/:id', isAdmin, updateReceiptStatus);

export default router;
