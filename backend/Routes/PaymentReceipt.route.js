import PaymentReceipt from '../Model/PaymentReceipt.model.js';
import express from 'express';
import { submitReceipt, getAllReceipts } from '../Controller/PaymentReceipt.controller.js';

const router = express.Router();

router.post('/receipt', submitReceipt);
router.get('/receipts', getAllReceipts); // Optional: for admin
router.patch('/receipt/:id', async (req, res) => {
    try {
        const updated = await PaymentReceipt.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
});

export default router;