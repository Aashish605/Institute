import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../config/api'

export default function Contacts() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    api.get('/api/contact').then(res => setContacts(res.data)).catch(() => toast.error('Failed to load contacts'))
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Submissions</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Email</th>
              <th className="px-6 py-4 font-semibold">Phone</th>
              <th className="px-6 py-4 font-semibold">Subject</th>
              <th className="px-6 py-4 font-semibold">Message</th>
              <th className="px-6 py-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-800">{c.fullName}</td>
                <td className="px-6 py-4 text-gray-600">{c.email}</td>
                <td className="px-6 py-4 text-gray-600">{c.phone}</td>
                <td className="px-6 py-4 text-gray-600">{c.subject}</td>
                <td className="px-6 py-4 text-gray-600 max-w-xs line-clamp-2">{c.message}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">No submissions yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
