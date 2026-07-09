import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'
import { AnimatedTabs } from '../components/ui/animated-tabs'
import { FiSearch } from 'react-icons/fi'

const filterTabs = [
  { label: 'Pending', value: 'pending' },
  { label: 'Verified', value: 'verified' },
]

export default function Payments() {
  const [receipts, setReceipts] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set('search', searchQuery)
    api.get(`/api/payment/receipts?${params}`)
      .then(res => setReceipts(res.data))
      .catch(() => setReceipts([]))
      .finally(() => setLoading(false))
  }, [searchQuery])

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
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payment Receipts</h1>
        <p className="text-gray-500 mt-1">View and verify submitted payment receipts</p>
      </motion.div>

      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, course..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <AnimatedTabs
          tabs={filterTabs}
          containerClassName="bg-white rounded-xl p-1.5 shadow-sm border border-gray-100 w-fit"
          onTabChange={(value) => setFilter(value)}
        />
      </motion.div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoaderThree />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-400 bg-white rounded-2xl border border-gray-100"
        >
          <p className="text-lg">No {filter} receipts found.</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div layout className="space-y-4">
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -2, boxShadow: '0 12px 24px rgba(0,0,0,0.06)' }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-md transition-all duration-300"
              >
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  src={r.receipt}
                  onClick={() => window.open(r.receipt, '_blank')}
                  className="w-28 h-28 object-contain border rounded-xl bg-gray-50 cursor-pointer shrink-0"
                  alt="payment receipt"
                  loading="lazy"
                />
                <div className="flex-1 w-full">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                    <div><span className="font-semibold text-gray-700">Course:</span> <span className="ml-2 text-gray-600">{r.course}</span></div>
                    <div><span className="font-semibold text-gray-700">Reference:</span> <span className="ml-2 text-gray-600">{r.reference || 'N/A'}</span></div>
                    <div><span className="font-semibold text-gray-700">Name:</span> <span className="ml-2 text-gray-600">{r.userName}</span></div>
                    <div><span className="font-semibold text-gray-700">Email:</span> <span className="ml-2 text-gray-600">{r.userEmail}</span></div>
                  </div>
                  {r.notes && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg text-sm">
                      <span className="font-semibold text-gray-700">Notes:</span>
                      <p className="text-gray-600 mt-1">{r.notes}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      r.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                    </span>
                    {r.status === 'pending' && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVerify(r.id)}
                        disabled={updating === r.id}
                        className="px-4 py-1.5 rounded-lg bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {updating === r.id ? 'Verifying...' : 'Mark as Verified'}
                      </motion.button>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    Submitted: {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
