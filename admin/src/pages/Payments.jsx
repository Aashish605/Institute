import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../config/api'

export default function Payments() {
  const [receipts, setReceipts] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/api/payment/receipts')
      .then(res => setReceipts(res.data))
      .catch(() => setReceipts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = receipts
    .filter(r => filter === 'pending' ? r.status === 'pending' : r.status === 'verified')
    .sort((a, b) => filter === 'verified' ? (a.userName || '').localeCompare(b.userName || '') : 0)

  const handleVerify = async (id) => {
    setUpdating(id)
    try {
      await api.patch(`/api/payment/receipt/${id}`, { status: 'verified' })
      setReceipts(receipts.map(r => r.id === id ? { ...r, status: 'verified' } : r))
      toast.success('Receipt verified')
    } catch { toast.error('Verification failed') }
    setUpdating(null)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Receipts</h1>
      <p className="text-gray-500 mb-6">View and verify submitted payment receipts.</p>
      <div className="flex gap-4 mb-6">
        <button onClick={() => setFilter('pending')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}`}>
          Pending
        </button>
        <button onClick={() => setFilter('verified')}
          className={`px-6 py-2 rounded-lg font-semibold transition ${filter === 'verified' ? 'bg-green-600 text-white' : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'}`}>
          Verified
        </button>
      </div>
      {loading ? (
        <div className="text-center py-16 text-gray-500 font-semibold">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No {filter} receipts found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(r => (
            <div key={r.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition">
              <img src={r.receipt} onClick={() => window.open(r.receipt, '_blank')} className="w-28 h-28 object-contain border rounded-lg bg-gray-50 cursor-pointer" alt="receipt" />
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-2">
                  <div><span className="font-semibold text-gray-700">Course:</span> <span className="ml-2">{r.course}</span></div>
                  <div><span className="font-semibold text-gray-700">Reference:</span> <span className="ml-2">{r.reference || 'N/A'}</span></div>
                  <div><span className="font-semibold text-gray-700">Name:</span> <span className="ml-2">{r.userName}</span></div>
                  <div><span className="font-semibold text-gray-700">Email:</span> <span className="ml-2">{r.userEmail}</span></div>
                </div>
                {r.notes && <div className="mb-2"><span className="font-semibold text-gray-700">Notes:</span> <span className="ml-2">{r.notes}</span></div>}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                  {r.status === 'pending' && (
                    <button onClick={() => handleVerify(r.id)} disabled={updating === r.id}
                      className="ml-4 px-4 py-1 rounded bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50">
                      {updating === r.id ? 'Verifying...' : 'Mark as Verified'}
                    </button>
                  )}
                </div>
                <div className="text-xs text-gray-400 mt-1">Submitted: {new Date(r.createdAt).toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
