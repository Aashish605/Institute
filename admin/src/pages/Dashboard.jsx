import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiBook, FiFileText, FiClipboard, FiCreditCard, FiMail, FiEdit3, FiUsers, FiUserCheck } from 'react-icons/fi'
import { motion } from 'motion/react'
import api from '../config/api'
import { LoaderThree } from '../components/ui/loader'

const cards = [
  { label: 'Courses', key: 'courses', icon: FiBook, color: 'from-blue-500 to-blue-600', endpoint: '/api/course', to: '/courses' },
  { label: 'Notices', key: 'notices', icon: FiFileText, color: 'from-green-500 to-green-600', endpoint: '/api/notice/get', to: '/notices' },
  { label: 'Mock Results', key: 'mocks', icon: FiClipboard, color: 'from-purple-500 to-purple-600', endpoint: '/api/mock/get', to: '/mocks' },
  { label: 'Pending Payments', key: 'pendingPayments', icon: FiCreditCard, color: 'from-yellow-500 to-orange-500', endpoint: '/api/payment/receipts', to: '/payments' },
  { label: 'Contacts', key: 'contacts', icon: FiMail, color: 'from-red-500 to-red-600', endpoint: '/api/contact', to: '/contacts' },
  { label: 'Content Blocks', key: 'contentBlocks', icon: FiEdit3, color: 'from-indigo-500 to-indigo-600', endpoint: '/api/content', to: '/content' },
  { label: 'Users', key: 'users', icon: FiUsers, color: 'from-teal-500 to-teal-600', endpoint: '/api/user/all', to: '/users' },
  { label: 'Enrollments', key: 'enrollments', icon: FiUserCheck, color: 'from-cyan-500 to-cyan-600', endpoint: '/api/enrollment/all', to: '/enrollments' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [counts, setCounts] = useState({})
  const [loadingCounts, setLoadingCounts] = useState(true)

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
      setLoadingCounts(false)
    })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your institute</p>
        </div>
      </motion.div>

      {loadingCounts ? (
        <div className="flex items-center justify-center py-20">
          <LoaderThree />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map(c => (
            <motion.div
              key={c.key}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(c.to)}
            >
              <div className={`bg-gradient-to-br ${c.color} p-4 rounded-xl text-white shadow-lg`}>
                <c.icon size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{c.label}</p>
                <motion.p
                  key={counts[c.key]}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-gray-800"
                >
                  {counts[c.key] ?? 0}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
