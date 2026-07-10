import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'
import { Star } from 'lucide-react'

export default function TestimonialList() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const fetchData = () => {
    setLoading(true)
    api.get('/api/testimonial/get').then(res => setTestimonials(res.data)).catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await api.delete('/api/testimonial/delete', { data: { id } })
      toast.success('Testimonial deleted')
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
          <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage student testimonials</p>
        </div>
        <NavLink to="/testimonials/new" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium shadow-sm">
          + Add Testimonial
        </NavLink>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Role / Company</th>
              <th className="px-6 py-4 font-semibold">Rating</th>
              <th className="px-6 py-4 font-semibold">Content</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {testimonials.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {t.avatar && <img src={t.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />}
                    <span className="font-medium text-gray-800">{t.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{t.role}{t.role && t.company ? ' at ' : ''}{t.company}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 line-clamp-2 max-w-xs">{t.content}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/testimonials/${t.id}/edit`, { state: { testimonial: t } })} className="px-3 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(t.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {testimonials.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">No testimonials yet</td></tr>
            )}
          </tbody>
        </table>
        </div>
      </motion.div>
    </div>
  )
}
