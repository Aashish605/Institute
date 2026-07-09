import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../config/api'
import { PAYMENTS } from '../config/site';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from "motion/react"

const Enroll = () => {
  const { model } = useParams();
  const user = useSelector(state => state.auth.user);

  const [course, setCourse] = useState();
  const [reference, setReference] = useState('');
  const [receipt, setReceipt] = useState();
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/api/course/${encodeURIComponent(model)}`)
      .then(res => setCourse(res.data))
      .catch(() => setCourse(null))
  }, [model]);

  const uploadReceiptToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", PAYMENTS.cloudinary.uploadPreset);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${PAYMENTS.cloudinary.cloudName}/image/upload`, data);
    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receipt) { setError('Receipt image is required.'); return; }
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const receiptUrl = await uploadReceiptToCloudinary(receipt);
      await api.post('/api/payment/receipt', {
        reference,
        receipt: receiptUrl,
        notes,
        course: course?.title,
        userName: user?.displayName || user?.name || "",
        userEmail: user?.email || "",
      });
      setSuccess(true);
      setReference('');
      setReceipt(null);
      setNotes('');
    } catch {
      setError('Submission failed. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="pt-24 pb-16 bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold mb-2">Complete Your Enrollment</h1>
          <p className="text-text-secondary mb-8">Pay via bank transfer and upload your receipt below.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Course Summary</h2>
              <div className="flex items-center gap-4">
                {course && <img src={course.image} alt="" className="w-20 h-20 rounded-lg object-cover" />}
                <div>
                  <div className="font-semibold">{course ? course.title : 'Loading...'}</div>
                  <div className="text-2xl font-bold text-primary mt-1">NPR {course ? course.newPrice : ''}</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Bank Payment Details</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-surface">
                  <div className="text-xs text-text-muted mb-1">Bank</div>
                  <div className="font-medium">{PAYMENTS.bank.name}</div>
                </div>
                <div className="p-4 rounded-lg bg-surface">
                  <div className="text-xs text-text-muted mb-1">Account Name</div>
                  <div className="font-medium">{PAYMENTS.bank.accountName}</div>
                </div>
                <div className="p-4 rounded-lg bg-surface">
                  <div className="text-xs text-text-muted mb-1">Account Number</div>
                  <div className="font-medium">{PAYMENTS.bank.accountNumber}</div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-center">
                  <img src={PAYMENTS.bank.qrImage} alt="QR" className="w-32 h-32 object-contain mx-auto mb-2" />
                  <div className="text-sm text-text-muted">Scan to Pay</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-6 shadow-sm border border-border">
              <h2 className="text-lg font-semibold mb-4">Upload Payment Receipt</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium mb-1">Transaction Reference</label>
                  <input id="reference" type="text" value={reference} onChange={e => setReference(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Bank transaction ID" />
                </div>
                <div>
                  <label htmlFor="receipt" className="block text-sm font-medium mb-1">Receipt Image <span className="text-error">*</span></label>
                  <input id="receipt" type="file" accept="image/*,application/pdf" onChange={e => setReceipt(e.target.files[0])} required className="block w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/5 file:text-primary hover:file:bg-primary/10" />
                  {receipt && <span className="text-xs text-success mt-1 block">{receipt.name}</span>}
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">Notes (Optional)</label>
                  <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" rows={3} placeholder="Any additional info" />
                </div>
                <button type="submit" disabled={submitting} className="w-full py-3 rounded-lg bg-secondary text-white font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50">
                  {submitting ? 'Submitting...' : 'Submit Payment for Verification'}
                </button>
                {error && <p className="text-sm text-error">{error}</p>}
                {success && <p className="text-sm text-success">Payment submitted! Our team will verify it within 1-2 business days.</p>}
              </form>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-28 space-y-4">
              <h3 className="font-semibold">Instructions</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                {PAYMENTS.instructions.map((inst, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/5 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {inst}
                  </li>
                ))}
              </ul>
              <hr className="border-border" />
              <div className="text-sm text-text-muted">
                <div className="font-medium text-text mb-1">Need help?</div>
                <a href={`tel:${PAYMENTS.contact.phone}`} className="text-primary hover:underline block">{PAYMENTS.contact.phone}</a>
                <a href={`mailto:${PAYMENTS.contact.email}`} className="text-primary hover:underline block">{PAYMENTS.contact.email}</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enroll;
