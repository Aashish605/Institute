import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../config/api';
import { PAYMENTS } from '../config/site';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from "motion/react";
import { 
  CreditCard, 
  ArrowLeft, 
  Sparkles, 
  QrCode, 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Phone, 
  Mail, 
  User, 
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../Components/ui/card';
import { Button } from '../Components/ui/button';
import { Badge } from '../Components/ui/badge';

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
    if (!receipt) { 
      setError('Please upload your receipt image to verify the payment.'); 
      return; 
    }
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
      setError('Submission failed. Please verify your internet connection and try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.04),_transparent_55%)] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <NavLink
            to={`/course/${encodeURIComponent(model)}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Course Details
          </NavLink>
        </motion.div>

        {/* Title Block */}
        <div className="mb-10">
          <Badge className="bg-secondary/15 hover:bg-secondary/15 text-secondary border-none px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            Checkout
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Complete Enrollment</h1>
          <p className="text-slate-500 mt-1.5 text-sm sm:text-base">Upload your payment proof to activate your learning portal access.</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Checkout Steps Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Course Summary */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
                  Course Selection Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {course?.image ? (
                      <img src={course.image} alt="" className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                        <Sparkles size={24} />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">{course ? course.title : 'Loading Course Details...'}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-slate-500 border-slate-200 font-medium">Entrance Preparation</Badge>
                        {user && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <User className="w-3.5 h-3.5" /> {user.displayName}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                    <span className="text-xs text-slate-400 block font-medium">Total Payable Amount</span>
                    <span className="text-2xl font-black text-primary">NPR {course ? course.newPrice : '...'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Bank payment Details */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
                  Bank Deposit / QR Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/70">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Bank Name</span>
                    <span className="font-bold text-slate-700 text-sm">{PAYMENTS.bank.name}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/70">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Account Holder</span>
                    <span className="font-bold text-slate-700 text-sm">{PAYMENTS.bank.accountName}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/70">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Account Number</span>
                    <span className="font-bold text-slate-800 text-sm font-mono tracking-tight">{PAYMENTS.bank.accountNumber}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
                  <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-100 mb-3">
                    <img src={PAYMENTS.bank.qrImage} alt="QR Code" className="w-36 h-36 object-contain" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-primary" /> Scan QR to Pay Instantly
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Supports any Nepalese banking app or digital wallet.</p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Submission form */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-5">
                <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
                  Upload Receipt Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                
                {success ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-2">
                      <FileCheck className="w-8 h-8 animate-bounce" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-slate-800">Receipt Submitted Successfully!</h4>
                      <p className="text-sm text-slate-500">Your details are sent. Our team will verify and activate your dashboard in 1-2 working days.</p>
                    </div>
                    <Button asChild className="mt-4 bg-primary text-white rounded-xl">
                      <NavLink to="/profile">Go to Dashboard</NavLink>
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="reference" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Transaction ID / Ref (Optional)
                        </label>
                        <input 
                          id="reference" 
                          type="text" 
                          value={reference} 
                          onChange={e => setReference(e.target.value)} 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-primary focus:bg-white" 
                          placeholder="e.g. 8421038592" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Receipt File <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input 
                            id="receipt" 
                            type="file" 
                            accept="image/*,application/pdf" 
                            onChange={e => setReceipt(e.target.files[0])} 
                            required 
                            className="hidden" 
                          />
                          <label 
                            htmlFor="receipt" 
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50/80 transition-colors text-slate-500 text-sm"
                          >
                            <UploadCloud className="w-4 h-4 text-primary" />
                            {receipt ? 'Change Receipt File' : 'Choose Receipt Image'}
                          </label>
                        </div>
                        {receipt && (
                          <span className="text-xs text-green-600 font-bold mt-1.5 block break-all">
                            ✓ {receipt.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Any Notes or Remarks (Optional)
                      </label>
                      <textarea 
                        id="notes" 
                        value={notes} 
                        onChange={e => setNotes(e.target.value)} 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-primary focus:bg-white" 
                        rows={3} 
                        placeholder="Include any payment details, name of depositor, or specific requests here..." 
                      />
                    </div>

                    {error && (
                      <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      disabled={submitting} 
                      className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl py-6 font-bold shadow-lg shadow-secondary/15 flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          Uploading & Submitting Payment...
                        </>
                      ) : (
                        <>
                          Confirm Payment Submission <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}

              </CardContent>
            </Card>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* Payment Instructions */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-white/95 rounded-3xl">
              <CardHeader className="border-b border-slate-50 pb-5">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-secondary" /> Verify Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {PAYMENTS.instructions.map((inst, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">{inst}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="border-slate-100 shadow-xl shadow-slate-100/50 bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                <HelpCircle size={150} />
              </div>
              <div className="relative z-10 space-y-4">
                <h4 className="text-base font-bold tracking-tight">Need assistance?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If you have issues uploading the receipt or verifying payment, please reach out to our helpdesk.
                </p>
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <a href={`tel:${PAYMENTS.contact.phone}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition">
                    <Phone className="w-4 h-4 text-secondary" /> {PAYMENTS.contact.phone}
                  </a>
                  <a href={`mailto:${PAYMENTS.contact.email}`} className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition break-all">
                    <Mail className="w-4 h-4 text-secondary" /> {PAYMENTS.contact.email}
                  </a>
                </div>
              </div>
            </Card>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Enroll;
