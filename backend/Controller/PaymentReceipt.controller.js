import PaymentReceipt from '../Model/PaymentReceipt.model.js';

export const submitReceipt = async (req, res) => {
    try {
        const { reference, receipt, notes, course, userName, userEmail } = req.body;
        if ( !receipt || !course || !userName || !userEmail) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const payment = new PaymentReceipt({
            reference,
            receipt,
            notes,
            course,
            userName,
            userEmail
        });
        await payment.save();
        res.status(201).json({ message: "Payment receipt submitted", payment });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Optional: Admin can get all receipts
export const getAllReceipts = async (req, res) => {
    try {
        const receipts = await PaymentReceipt.find().sort({ createdAt: -1 });
        res.json(receipts);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};