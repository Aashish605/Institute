import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.get('/api/contact').then(res => setContacts(res.data)).catch(() => toast.error('Failed to load contacts'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <LoaderThree />
    </div>
  )

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contact Submissions</h1>
        <p className="text-gray-500 mt-1">Messages from your website visitors</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Name</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Email</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Phone</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Subject</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Message</th>
                <th className="px-6 py-4 font-semibold whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{c.fullName}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{c.email}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{c.phone}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{c.subject}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs line-clamp-2">{c.message}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                </motion.tr>
              ))}
              {contacts.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">No submissions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
