import { PaymentReceipt, Course } from '../Model/index.js';

export const submitReceipt = async (req, res) => {
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
        const receipts = await PaymentReceipt.findAll({ order: [['createdAt', 'DESC']] });
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};