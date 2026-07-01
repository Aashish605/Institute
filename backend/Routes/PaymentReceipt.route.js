import { PaymentReceipt } from '../Model/index.js';
import express from 'express';
import { submitReceipt, getAllReceipts } from '../Controller/PaymentReceipt.controller.js';

const router = express.Router();

router.post('/receipt', submitReceipt);
router.get('/receipts', getAllReceipts); // Optional: for admin
router.patch('/receipt/:id', async (req, res) => {
    try {
        await PaymentReceipt.update(
            { status: req.body.status },
            { where: { id: req.params.id } }
        );
        const updated = await PaymentReceipt.findByPk(req.params.id);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
});

export default router;