import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../config/api'

export default function CourseList() {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/course').then(res => setCourses(res.data)).catch(() => toast.error('Failed to load courses'))
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        <NavLink to="/courses/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium">
          + Add Course
        </NavLink>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
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
            {courses.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{c.title}</td>
                <td className="px-6 py-4 text-gray-600">Rs. {c.newPrice} <span className="line-through text-gray-400 text-sm">Rs. {c.oldPrice}</span></td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">{c.discount}</span></td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => navigate(`/courses/${c.id}/edit`, { state: { course: c } })}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c.id, c.title)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">No courses yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
