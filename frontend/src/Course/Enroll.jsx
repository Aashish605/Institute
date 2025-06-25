import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; // <-- Add this

const Enroll = () => {
    const { model } = useParams();

    // Get user info from Redux
    const user = useSelector(state => state.auth.user);

    const [course, setCourse] = useState();
    const [reference, setReference] = useState('');
    const [receipt, setReceipt] = useState();
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Add your Cloudinary config
    const CLOUDINARY_UPLOAD_PRESET = "image_preset"; // replace with your preset
    const CLOUDINARY_CLOUD_NAME = "drsfbaluf"; // replace with your cloud name

    const uploadReceiptToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        try {
            const api = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
            const res = await axios.post(api, data);
            return res.data.secure_url;
        } catch (error) {
            throw new Error("Failed to upload receipt image.",error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://institute-xi.vercel.app/api/course');
                const found = res.data.find(item => item.title === model);
                setCourse(found)
            } catch (error) {
                setCourse(null);
                console.log(error);
                
            }
        };
        fetchData();
    }, [model]);

    const handleFileChange = (e) => {
        setReceipt(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess(false);
        if (!receipt) {
            setError('Transaction reference and receipt are required.');
            setSubmitting(false);
            return;
        }
        try {
            // 1. Upload receipt to Cloudinary
            const receiptUrl = await uploadReceiptToCloudinary(receipt);

            // 2. Send the URL and user info to your backend
            const payload = {
                reference,
                receipt: receiptUrl,
                notes,
                course: course?.title,
                userName: user?.displayName || user?.name || "",
                userEmail: user?.email || "",
            };
console.log(payload);

            await axios.post('https://institute-xi.vercel.app/api/payment/receipt', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            setSuccess(true);
            setReference('');
            setReceipt(null);
            setNotes('');
        } catch (err) {
            setError('Submission failed. Please try again.');
            console.log(err);   
        }
        setSubmitting(false);
    };

    return (
        <div className="w-full bg-gray-50">
            <div className="max-w-[85vw] mx-auto py-12 ">
                <div className=" flex    flex-col lg:flex-row gap-10 mb-12">
                    <div className="bg-white shadow-xl rounded-2xl p-6 h-fit   flex flex-col max-sm:hidden gap-2">
                        <h1 className='text-4xl font-semibold my-4'>{model} </h1>
                        <p className='h-[1px] bg-black opacity-20 '></p>
                        <p className='text-xl font-semibold my-3'>Payment Instruction</p>
                        <ul className='list-disc opacity-55 px-10'>
                            <li> Use the account details shown below</li>
                            <li>Upload your receipt image and click on the "Submit Payment for Verification" butto</li>
                            <li>Manual payments will be verified by our team within 1-2 business days</li>
                            <li>If you encounter any issues, please contact our support team</li>
                        </ul>
                        <p className='h-[1px] bg-black opacity-20 '></p>
                        <div>
                            <p className='font-semibold my-3'>Contact Information</p>
                            <div className='flex my-2 gap-4 items-center'>
                                <img src="/contact/phone.png" className='w-5 h-5' alt="" />
                                <div>
                                    <a href="tel:+9779851198288" className="opacity-70 block">+977 9851198288</a>
                                </div>
                            </div>
                            <div className='flex my-2 gap-4 items-center'>
                                <img src="/contact/mail.png" className='w-5 h-5' alt="" />
                                <div>
                                    <a href="mailto:info@piacademy.edu.np" className="opacity-70 block">neobridge.edu.np</a>
                                </div>
                            </div>
                            <div className='flex my-2 gap-4 items-center'>
                                <img src="/contact/location.png" className='w-5 h-5' alt="" />
                                <div className='opacity-70'>
                                    <p>Birendranagar,Surkhet, Nepal</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="bg-white shadow-xl rounded-2xl  overflow-y-scroll top-[100px] z-10 p-6 px-8 gap-y-8 flex flex-col gap-2">
                        <h1 className='text-4xl font-semibold text-center'>Complete Your Payment</h1>
                        <div className='bg-gray-50 py-3 rounded-md'>
                            <h1 className='text-xl font-semibold px-3 '>
                                {course ? course.title : "Loading..."}
                            </h1>
                            <h1 className='px-3 text-green-800 font-semibold text-xl text-center my-2'>
                                NPR {course ? course.newPrice : ""}
                            </h1>
                        </div>
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 flex items-start gap-2">
                            <span className="mt-1">
                                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-3a1 1 0 100 2 1 1 0 000-2zm2 7a1 1 0 01-2 0v-2a1 1 0 012 0v2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span>
                                <span className="font-semibold text-blue-700">How to pay:</span>
                                <span className="text-blue-700"> Make a bank transfer using the details below, then click the "Upload Receipt" button above to submit your payment proof.</span>
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Bank Account Information */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-lg font-semibold mb-4">Bank Account Information</h2>
                                <div className="mb-2">
                                    <span className="font-bold">Bank Name: </span>
                                    Citizen Bank International
                                </div>
                                <div className="mb-2">
                                    <span className="font-bold">Account Name: </span>
                                    Neo bridge
                                </div>
                                <div>
                                    <span className="font-bold">Account Number: </span>
                                    ****************
                                </div>
                            </div>
                            {/* Scan to Pay */}
                            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center">
                                <h2 className="text-lg font-semibold mb-4">Scan to Pay</h2>
                                <img src="/logo.png" alt="QR Code" className="w-40 h-40 mb-2 object-center " />
                                <div className="font-semibold">Neo Bridge</div>
                                <div className="text-gray-500 text-sm mt-2 text-center">Scan this QR code with your banking app</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2 mt-8">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V6M5 12l7-7 7 7" />
                            </svg>
                            <h3 className="text-xl font-semibold">Submit Your Bank Transfer</h3>
                        </div>

                        <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 flex items-start gap-2 rounded mb-6">
                            <span className="mt-1">
                                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-3a1 1 0 100 2 1 1 0 000-2zm2 7a1 1 0 01-2 0v-2a1 1 0 012 0v2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            <span>
                                <span className="font-bold">Important: </span>
                                Please make sure you've already completed your bank transfer before uploading your receipt. Your enrollment will be confirmed after manual verification.
                            </span>
                        </div>
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl  flex flex-col gap-6 ">
                            <div>
                                <label className="block font-semibold mb-1">Transaction Reference Number</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Bank transaction ID or reference number"
                                    value={reference}
                                    onChange={e => setReference(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Upload Payment Receipt <span className="text-red-500">*</span></label>
                                <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    className="block"
                                    onChange={handleFileChange}
                                    required
                                />
                                <p className="text-gray-400 text-sm mt-1">Please upload an image (JPG, PNG) or PDF of your payment receipt</p>
                                {receipt && <span className="text-green-600 text-sm">{receipt.name}</span>}
                            </div>
                            <div>
                                <label className="block font-semibold mb-1">Payment Notes (Optional)</label>
                                <textarea
                                    className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    placeholder="Any additional information about your payment"
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded py-3 mt-2 transition disabled:opacity-60"
                                disabled={submitting}
                            >
                                {submitting ? "Submitting..." : "Submit Payment for Verification"}
                            </button>
                            {error && <div className="text-red-600 text-sm">{error}</div>}
                            {success && <div className="text-green-600 text-sm">Your payment will be manually verified by our team.</div>}
                            <div className="text-gray-400 text-center mt-2">
                                Your payment will be manually verified by our team
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Enroll;
