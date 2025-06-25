import mongoose from 'mongoose';

const PaymentReceiptSchema = new mongoose.Schema({
    reference: { type: String },
    receipt: { type: String, required: true }, // Cloudinary URL
    notes: { type: String },
    course: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    status: { type: String, default: "pending" } // for admin verification
}, { timestamps: true });

const PaymentReceipt = mongoose.model('PaymentReceipt', PaymentReceiptSchema);
export default PaymentReceipt;