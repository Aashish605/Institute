import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../config/api'

export default function NoticeList() {
  const [notices, setNotices] = useState([])

  const fetchData = () => {
    api.get('/api/notice/get?limit=50').then(res => setNotices(res.data.rows)).catch(() => toast.error('Failed to load notices'))
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return
    try {
      await api.post('/api/notice/delete', { id })
      toast.success('Notice deleted')
      fetchData()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notices</h1>
        <NavLink to="/notices/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
          + Add Notice
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {notices.map(n => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{n.Title}</td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2">{n.Description}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(n.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400">No notices yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
