import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../config/api'

export default function MockList() {
  const [mocks, setMocks] = useState([])

  const fetchData = () => {
    api.get('/api/mock/get?limit=50').then(res => setMocks(res.data.rows)).catch(() => toast.error('Failed to load mock results'))
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this mock result?')) return
    try {
      await api.post('/api/mock/delete', { id })
      toast.success('Mock result deleted')
      fetchData()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mock Results</h1>
        <NavLink to="/mocks/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
          + Add Mock Result
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Week</th>
              <th className="px-6 py-4 font-semibold">Description</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mocks.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{m.Title}</td>
                <td className="px-6 py-4 text-gray-600">{m.Week}</td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2">{m.Description}</td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDelete(m.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {mocks.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">No mock results yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
