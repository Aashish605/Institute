import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

export default function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [verifiedFilter, setVerifiedFilter] = useState('all')
  const [debounced, setDebounced] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300)
    return () => clearTimeout(timer)
  }, [search])

  const fetchData = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (debounced) params.set('search', debounced)
    if (roleFilter !== 'all') params.set('isAdmin', roleFilter)
    if (verifiedFilter !== 'all') params.set('isEmailVerified', verifiedFilter)
    api.get(`/api/user/all?${params}`).then(res => setUsers(res.data)).catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [debounced, roleFilter, verifiedFilter])

  const handleDelete = async (id, displayName) => {
    if (!confirm(`Delete user "${displayName}"?`)) return
    try {
      await api.delete(`/api/user/${id}`)
      toast.success('User deleted')
      fetchData()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-500 mt-1">Manage student and admin accounts</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex flex-wrap gap-3">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search name, email, class, school..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
          <option value="all">All Roles</option>
          <option value="true">Admin</option>
          <option value="false">User</option>
        </select>
        <select value={verifiedFilter} onChange={e => setVerifiedFilter(e.target.value)} className="px-3 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition">
          <option value="all">All Status</option>
          <option value="true">Verified</option>
          <option value="false">Pending</option>
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
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Class</th>
                <th className="px-6 py-4 font-semibold">School</th>
                <th className="px-6 py-4 font-semibold">Verified</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {u.photo && <img src={u.photo} alt="" className="w-8 h-8 rounded-full object-cover" />}
                      <span className="font-medium text-gray-800">{u.displayName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{u.email}</td>
                  <td className="px-6 py-4 text-gray-600">{u.class || '—'}</td>
                  <td className="px-6 py-4 text-gray-600">{u.school || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {u.isEmailVerified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleDelete(u.id, u.displayName)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400">No users yet</td></tr>
              )}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}
