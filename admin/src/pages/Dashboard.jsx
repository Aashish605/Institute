import { useEffect, useState } from 'react'
import { FiBook, FiFileText, FiClipboard, FiCreditCard, FiMail, FiEdit3 } from 'react-icons/fi'
import api from '../config/api'

const cards = [
  { label: 'Courses', key: 'courses', icon: FiBook, color: 'bg-blue-500', endpoint: '/api/course' },
  { label: 'Notices', key: 'notices', icon: FiFileText, color: 'bg-green-500', endpoint: '/api/notice/get' },
  { label: 'Mock Results', key: 'mocks', icon: FiClipboard, color: 'bg-purple-500', endpoint: '/api/mock/get' },
  { label: 'Pending Payments', key: 'pendingPayments', icon: FiCreditCard, color: 'bg-yellow-500', endpoint: '/api/payment/receipts' },
  { label: 'Contacts', key: 'contacts', icon: FiMail, color: 'bg-red-500', endpoint: '/api/contact' },
  { label: 'Content Blocks', key: 'contentBlocks', icon: FiEdit3, color: 'bg-indigo-500', endpoint: '/api/content' },
]

export default function Dashboard() {
  const [counts, setCounts] = useState({})

  useEffect(() => {
    Promise.all(
      cards.map(c =>
        api.get(c.endpoint).then(res => {
          if (Array.isArray(res.data)) {
            if (c.key === 'pendingPayments') {
              return { key: c.key, value: res.data.filter(r => r.status === 'pending').length }
            }
            return { key: c.key, value: res.data.length }
          }
          if (res.data.rows) return { key: c.key, value: res.data.rows.length }
          if (typeof res.data === 'object') return { key: c.key, value: Object.keys(res.data).length }
          return { key: c.key, value: 0 }
        }).catch(() => ({ key: c.key, value: 0 }))
      )
    ).then(results => {
      const obj = {}
      results.forEach(r => { obj[r.key] = r.value })
      setCounts(obj)
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(c => (
          <div key={c.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition">
            <div className={`${c.color} p-4 rounded-xl text-white`}>
              <c.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{c.label}</p>
              <p className="text-3xl font-bold text-gray-800">{counts[c.key] ?? '...'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
