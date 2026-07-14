import { useEffect, useState, useCallback, useRef } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

function SearchableSelect({ endpoint, placeholder, label, value, onChange }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const debouncedQuery = useDebounce(query, 300)
  const ref = useRef(null)
  const selectedRef = useRef(null)

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return }
    setLoading(true)
    api.get(`${endpoint}?search=${encodeURIComponent(debouncedQuery)}`)
      .then(res => {
        const data = endpoint.includes('user') ? res.data : res.data.courses || []
        setResults(data)
        setOpen(true)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [debouncedQuery, endpoint])

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (selectedRef.current) selectedRef.current.scrollIntoView({ block: 'nearest' })
  }, [results])

  const chip = selectedItem || (value && results.find(r => r.id === value))

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={chip ? '' : placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); if (value) { onChange(''); setSelectedItem(null) } }}
          onFocus={() => { if (results.length) setOpen(true) }}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      {chip && !query && (
        <div className="mt-1.5 flex items-center gap-2 bg-primary/10 text-primary text-sm rounded-lg px-3 py-1.5">
          {endpoint.includes('user') ? (
            <>
              {chip.photo && <img src={chip.photo} alt="" className="w-5 h-5 rounded-full object-cover" />}
              <span className="font-medium">{chip.displayName}</span>
              <span className="text-primary/60">({chip.email})</span>
            </>
          ) : (
            <span className="font-medium">{chip.title}</span>
          )}
          <button type="button" onClick={() => { onChange(''); setSelectedItem(null) }} className="ml-auto text-primary/60 hover:text-primary">&times;</button>
        </div>
      )}
      {open && (query || results.length > 0) && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.length === 0 && query ? (
            <div className="px-3 py-2 text-sm text-gray-400">No results</div>
          ) : (
            results.map(r => (
              <button
                key={r.id}
                type="button"
                ref={r.id === value ? selectedRef : null}
                onClick={() => { onChange(r.id); setSelectedItem(r); setQuery(''); setOpen(false) }}
                className={`w-full text-left px-3 py-2.5 text-sm hover:bg-primary/5 transition flex items-center gap-2 ${
                  r.id === value ? 'bg-primary/10 text-primary font-medium' : 'text-gray-700'
                }`}
              >
                {endpoint.includes('user') ? (
                  <>
                    {r.photo && <img src={r.photo} alt="" className="w-6 h-6 rounded-full object-cover" />}
                    <div className="truncate">
                      <span>{r.displayName}</span>
                      <span className="text-gray-400 ml-1">({r.email})</span>
                    </div>
                  </>
                ) : (
                  <span>{r.title}</span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingEnrollment, setEditingEnrollment] = useState(null)
  
  // Form state
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [reference, setReference] = useState('')
  const [receipt, setReceipt] = useState('')
  const [notes, setNotes] = useState('')
  const [totalFee, setTotalFee] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('remaining')
  const [remarks, setRemarks] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchEnrollments = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (courseFilter) params.set('courseId', courseFilter)
    api.get(`/api/enrollment/all?${params}`)
      .then(res => setEnrollments(res.data))
      .catch(() => toast.error('Failed to load enrollments'))
      .finally(() => setLoading(false))
  }, [search, courseFilter])

  useEffect(() => { fetchEnrollments() }, [fetchEnrollments])

  useEffect(() => {
    api.get('/api/course/').then(res => setCourses(res.data.courses)).catch(() => {})
  }, [])

  // When course is selected in add mode, auto-fill totalFee with course.newPrice
  useEffect(() => {
    if (!editMode && selectedCourse) {
      const course = courses.find(c => c.id === selectedCourse)
      if (course && course.newPrice !== undefined) {
        setTotalFee(course.newPrice)
      }
    }
  }, [selectedCourse, editMode, courses])

  const resetForm = () => {
    setSelectedUser('')
    setSelectedCourse('')
    setPaymentType('cash')
    setReference('')
    setReceipt('')
    setNotes('')
    setTotalFee('')
    setPaidAmount('')
    setPaymentStatus('remaining')
    setRemarks('')
    setEditMode(false)
    setEditingEnrollment(null)
  }

  const openAddModal = () => {
    resetForm()
    setShowModal(true)
  }

  const openEditModal = (enrollment) => {
    const payment = enrollment.Payment || {}
    setSelectedUser(enrollment.User?.id || '')
    setSelectedCourse(enrollment.Course?.id || '')
    setPaymentType(payment.paymentType || 'cash')
    setReference(payment.reference || '')
    setReceipt(payment.receipt || '')
    setNotes(payment.notes || '')
    setTotalFee(payment.totalFee !== undefined ? payment.totalFee : (enrollment.Course?.newPrice || ''))
    setPaidAmount(payment.paidAmount !== undefined ? payment.paidAmount : '')
    setPaymentStatus(payment.paymentStatus || 'remaining')
    setRemarks(payment.remarks || '')
    setEditMode(true)
    setEditingEnrollment(enrollment)
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedUser || !selectedCourse) return toast.error('Select both a user and a course')
    if (editMode && !editingEnrollment) return
    
    setSubmitting(true)
    try {
      const payload = {
        userId: selectedUser,
        courseId: selectedCourse,
        paymentType,
        reference: reference || undefined,
        receipt: receipt || undefined,
        notes: notes || undefined,
        totalFee: totalFee !== '' ? parseFloat(totalFee) : undefined,
        paidAmount: paidAmount !== '' ? parseFloat(paidAmount) : undefined,
        paymentStatus,
        remarks: remarks || undefined,
      }

      if (editMode) {
        await api.put(`/api/enrollment/${editingEnrollment.id}`, payload)
        toast.success('Enrollment updated')
      } else {
        await api.post('/api/enrollment', payload)
        toast.success('Enrollment added')
      }
      setShowModal(false)
      resetForm()
      fetchEnrollments()
    } catch (err) {
      toast.error(err.response?.data?.msg || (editMode ? 'Failed to update enrollment' : 'Failed to add enrollment'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this enrollment?')) return
    try {
      await api.delete(`/api/enrollment/${id}`)
      toast.success('Enrollment removed')
      fetchEnrollments()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Enrollments</h1>
          <p className="text-gray-500 mt-1">Manage course enrollments and payment tracking</p>
        </div>
        <button onClick={openAddModal} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-sm">
          + Add Enrollment
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex flex-wrap gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by user name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
          <option value="">All Courses</option>
          {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoaderThree />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Course Fee</th>
                <th className="px-6 py-4 font-semibold">Paid</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Remarks</th>
                <th className="px-6 py-4 font-semibold">Enrolled</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollments.map((e, i) => {
                const payment = e.Payment || {}
                const courseFee = payment.totalFee ?? e.Course?.newPrice ?? 0
                const paid = payment.paidAmount ?? 0
                const status = payment.paymentStatus || 'remaining'
                return (
                  <motion.tr
                    key={e.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {e.User?.photo && <img src={e.User.photo} alt="" className="w-8 h-8 rounded-full object-cover" />}
                        <div>
                          <div className="font-medium text-gray-800">{e.User?.displayName || '—'}</div>
                          <div className="text-xs text-gray-400">{e.User?.email || ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{e.Course?.title || '—'}</td>
                    <td className="px-6 py-4 text-gray-700">Rs. {courseFee.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-700 font-medium">Rs. {paid.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {status === 'completed' ? 'Completed' : 'Remaining'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate block">{payment.remarks || '—'}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button onClick={() => openEditModal(e)} className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(e.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                        Remove
                      </button>
                    </td>
                  </motion.tr>
                )
              })}
              {enrollments.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-10 text-center text-gray-400">No enrollments found</td></tr>
              )}
            </tbody>
          </table>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">{editMode ? 'Edit Enrollment' : 'Add Enrollment'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <SearchableSelect
                  endpoint="/api/user/all"
                  placeholder="Search users by name or email..."
                  label="User"
                  value={selectedUser}
                  onChange={setSelectedUser}
                  disabled={editMode}
                />

                <SearchableSelect
                  endpoint="/api/course"
                  placeholder="Search courses by title..."
                  label="Course"
                  value={selectedCourse}
                  onChange={setSelectedCourse}
                  disabled={editMode}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Payment Type</label>
                  <select
                    value={paymentType}
                    onChange={e => setPaymentType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="cash">Cash</option>
                    <option value="online">Online</option>
                  </select>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Total Fee (Rs.)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={totalFee}
                        onChange={e => setTotalFee(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        placeholder="Course fee"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Paid Amount (Rs.)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={paidAmount}
                        onChange={e => setPaidAmount(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        placeholder="Amount paid"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Payment Status</label>
                      <select
                        value={paymentStatus}
                        onChange={e => setPaymentStatus(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      >
                        <option value="remaining">Remaining</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Remarks</label>
                      <textarea
                        rows={2}
                        placeholder="Payment remarks..."
                        value={remarks}
                        onChange={e => setRemarks(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Receipt Details (optional)</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Receipt URL</label>
                      <input
                        type="text"
                        placeholder="https://res.cloudinary.com/..."
                        value={receipt}
                        onChange={e => setReceipt(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Reference / Transaction ID</label>
                      <input
                        type="text"
                        placeholder="e.g. TXN123456"
                        value={reference}
                        onChange={e => setReference(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Optional notes..."
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium text-sm shadow-sm disabled:opacity-50">
                    {submitting ? (editMode ? 'Updating...' : 'Adding...') : (editMode ? 'Update Enrollment' : 'Add Enrollment')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}