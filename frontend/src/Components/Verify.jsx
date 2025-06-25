import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Verify = () => {
    const user = useSelector(state => state.auth.user)
    const [receipts, setReceipts] = useState([])
    const [filter, setFilter] = useState('pending') // 'pending' or 'verified'
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(null) // id of receipt being updated

    useEffect(() => {
        const fetchReceipts = async () => {
            setLoading(true)
            try {
                const res = await axios.get('https://institute-xi.vercel.app/api/payment/receipts')
                const userReceipts = res.data.filter(r => r.userEmail === user?.email)
                setReceipts(userReceipts)
            } catch (err) {
                setReceipts([])
                console.log(err);
            }
            setLoading(false)
        }
        if (user?.email) fetchReceipts()
    }, [user])

    const filteredReceipts = receipts
        .filter(r =>
            filter === 'pending' ? r.status === 'pending' : r.status === 'verified'
        )
        .sort((a, b) => {
            // Only sort if filter is 'verified'
            if (filter === 'verified') {
                const nameA = (a.userName || '').toLowerCase();
                const nameB = (b.userName || '').toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            }
            return 0; // No sorting for pending
        });

    // Handler to update status
    const handleVerify = async (id) => {
        setUpdating(id)
        try {
            await axios.patch(`https://institute-xi.vercel.app/api/payment/receipt/${id}`, { status: 'verified' })
            setReceipts(receipts =>
                receipts.map(r => r._id === id ? { ...r, status: 'verified' } : r)
            )
        } catch (err) {
            alert("Failed to update status.")
            console.log(err);
        }
        setUpdating(null)
    }

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold text-secondary mb-2 text-center"> Payment Receipts</h1>
                <p className="text-center mb-10 opacity-60 font-medium">
                    View  submitted payment receipts and their verification status.
                </p>
                <div className="flex justify-center gap-4 mb-8">
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold shadow transition 
                        ${filter === 'pending'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}`}
                        onClick={() => setFilter('pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`px-6 py-2 rounded-lg font-semibold shadow transition 
                        ${filter === 'verified'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'}`}
                        onClick={() => setFilter('verified')}
                    >
                        Verified
                    </button>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <span className="text-blue-600 font-semibold text-lg">Loading...</span>
                    </div>
                ) : filteredReceipts.length === 0 ? (
                    <div className="text-gray-400 text-center py-16 text-lg">
                        No {filter} receipts found.
                    </div>
                ) : (
                    <div className="space-y-8">
                        {filteredReceipts.map(r => (
                            <div
                                key={r._id}
                                className="bg-white border border-gray-100 rounded-2xl shadow-md flex flex-col md:flex-row gap-6 items-center p-6 hover:shadow-lg transition"
                            >
                                <img
                                    src={r.receipt}
                                    onClick={() => window.open(r.receipt, "_blank")}
                                    alt="Receipt"
                                    className="w-36 h-36 object-contain border rounded-lg bg-gray-50 cursor-pointer"
                                />
                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap gap-x-8 gap-y-2 mb-2">
                                        <div>
                                            <span className="font-semibold text-gray-700">Course:</span>
                                            <span className="ml-2">{r.course}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-700">Reference:</span>
                                            <span className="ml-2">{r.reference}</span>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold text-gray-700">Notes:</span>
                                        <span className="ml-2">{r.notes || <span className="italic text-gray-400">None</span>}</span>
                                    </div>
                                    <div className="mb-2">
                                        <span className="font-semibold text-gray-700">Name:</span>
                                        <span className="ml-2">{r.userName}</span>
                                    </div>
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="font-semibold text-gray-700">Status:</span>
                                        <span className={`font-bold px-3 py-1 rounded-full text-sm
                                            ${r.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-green-100 text-green-700'}`}>
                                            {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                        </span>
                                        {filter === 'pending' && (
                                            <button
                                                className="ml-4 px-4 py-1 rounded bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition"
                                                disabled={updating === r._id}
                                                onClick={() => handleVerify(r._id)}
                                            >
                                                {updating === r._id ? "Verifying..." : "Mark as Verified"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Submitted: {new Date(r.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Verify
