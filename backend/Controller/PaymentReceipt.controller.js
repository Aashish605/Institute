import { PaymentReceipt, Course } from '../Model/index.js';

export const submitReceipt = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    try {
        const { reference, receipt, notes, course, userName, userEmail } = req.body;
        if ( !receipt || !course || !userName || !userEmail) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const courseMatch = await Course.findOne({ where: { title: course } });
        const payment = await PaymentReceipt.create({
            reference,
            receipt,
            notes,
            course,
            userName,
            userEmail,
            userId: req.user?.id || null,
            courseId: courseMatch?.id || null,
        });
        res.status(201).json({ message: "Payment receipt submitted", payment });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Optional: Admin can get all receipts
export const getAllReceipts = async (req, res) => {
    try {
        const where = {};
        if (req.query.email) where.userEmail = req.query.email;
        const receipts = await PaymentReceipt.findAll({ where, order: [['createdAt', 'DESC']] });
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const updateReceiptStatus = async (req, res) => {
    try {
        const receipt = await PaymentReceipt.findByPk(req.params.id);
        if (!receipt) return res.status(404).json({ message: "Receipt not found" });
        await receipt.update({ status: req.body.status });
        res.json(receipt);
    } catch (err) {
        res.status(500).json({ message: "Failed to update status" });
    }
};