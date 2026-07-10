import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    api.get('/api/course').then(res => setCourses(res.data.courses)).catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    try {
      await api.delete(`/api/course/${id}`)
      setCourses(courses.filter(c => c.id !== id))
      toast.success('Course deleted')
    } catch {
      toast.error('Delete failed')
    }
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
          <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
          <p className="text-gray-500 mt-1">Manage your course catalog</p>
        </div>
        <NavLink to="/courses/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-sm">
          + Add Course
        </NavLink>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Discount</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((c, i) => (
              <motion.tr
                key={c.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{c.title}</td>
                <td className="px-6 py-4 text-gray-600">Rs. {c.newPrice} <span className="line-through text-gray-400 text-sm">Rs. {c.oldPrice}</span></td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{c.discount}</span></td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => navigate(`/courses/${c.id}/edit`, { state: { course: c } })}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c.id, c.title)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">No courses yet</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </motion.div>
    </div>
  )
}
