import { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [paymentType, setPaymentType] = useState('cash')
  const [submitting, setSubmitting] = useState(false)

  const fetchEnrollments = useCallback(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (courseFilter) params.set('courseId', courseFilter)
    api.get(`/api/enrollment/all?${params}`).then(res => setEnrollments(res.data)).catch(() => toast.error('Failed to load enrollments'))
      .finally(() => setLoading(false))
  }, [search, courseFilter])

  useEffect(() => { fetchEnrollments() }, [fetchEnrollments])

  useEffect(() => {
    api.get('/api/course/').then(res => setCourses(res.data.courses)).catch(() => {})
    api.get('/api/user/all').then(res => setUsers(res.data)).catch(() => {})
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Remove this enrollment?')) return
    try {
      await api.delete(`/api/enrollment/${id}`)
      toast.success('Enrollment removed')
      fetchEnrollments()
    } catch { toast.error('Delete failed') }
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!selectedUser || !selectedCourse) return toast.error('Select both a user and a course')
    setSubmitting(true)
    try {
      await api.post('/api/enrollment', { userId: selectedUser, courseId: selectedCourse, paymentType })
      toast.success('Enrollment added')
      setShowModal(false)
      setSelectedUser('')
      setSelectedCourse('')
      setPaymentType('cash')
      fetchEnrollments()
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add enrollment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Enrollments</h1>
          <p className="text-gray-500 mt-1">Manage course enrollments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-sm">
          + Add Enrollment
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex flex-wrap gap-3">
        <div className="relative w-72">
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Enrolled</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {enrollments.map((e, i) => (
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
                  <td className="px-6 py-4 text-gray-500 text-sm">{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(e.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                      Remove
                    </button>
                  </td>
                </motion.tr>
              ))}
              {enrollments.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">No enrollments found</td></tr>
              )}
            </tbody>
          </table>
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
              className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Enrollment</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">User</label>
                  <select
                    required
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="">Select a user...</option>
                    {users.map(u => <option key={u.id} value={u.id}>{u.displayName} ({u.email})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Course</label>
                  <select
                    required
                    value={selectedCourse}
                    onChange={e => setSelectedCourse(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  >
                    <option value="">Select a course...</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
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
                <div className="flex gap-3 justify-end pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium text-sm shadow-sm disabled:opacity-50">
                    {submitting ? 'Adding...' : 'Add Enrollment'}
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
