import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'
import { FiFileText, FiDownload, FiImage } from 'react-icons/fi'

export default function MockList() {
  const [mocks, setMocks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = () => {
    setLoading(true)
    api.get('/api/mock/get?limit=50').then(res => setMocks(res.data.rows)).catch(() => toast.error('Failed to load mock results'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this mock result?')) return
    try {
      await api.delete('/api/mock/delete', { data: { id } })
      toast.success('Mock result deleted')
      fetchData()
    } catch { toast.error('Delete failed') }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <LoaderThree />
    </div>
  )

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mock Results</h1>
          <p className="text-gray-500 mt-1">Manage weekly mock test results</p>
        </div>
        <NavLink to="/mocks/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-sm">
          + Add Mock Result
        </NavLink>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Week</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">File</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mocks.map((m, i) => (
              <motion.tr
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{m.Title}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{m.Week}</span></td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2 max-w-xs">{m.Description}</td>
                <td className="px-6 py-4">
                  {m.FileType === 'image' ? (
                    <span className="inline-flex items-center gap-1 text-sm text-gray-500"><FiImage /> Image</span>
                  ) : m.FileType === 'pdf' ? (
                    <span className="inline-flex items-center gap-1 text-sm text-red-500"><FiFileText /> PDF</span>
                  ) : m.FileType === 'xlsx' ? (
                    <span className="inline-flex items-center gap-1 text-sm text-green-600"><FiDownload /> Excel</span>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/mocks/${m.id}/edit`, { state: { mock: m } })} className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(m.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {mocks.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No mock results yet</td></tr>
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
