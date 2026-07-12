import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { BackgroundBeams } from "../components/ui/background-beams"
import api from '../config/api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Email and password are required'); return }
    setSubmitting(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      if (!res.data.user?.isAdmin) {
        setError('Only admin accounts can access this panel')
        return
      }
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <BackgroundBeams />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="relative z-10 bg-white/90 backdrop-blur-lg p-6 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <span className="text-white text-2xl font-bold">A</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">Admin</h1>
        <p className="text-gray-500 mb-8 text-center">Sign in to manage your website</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-[3px] focus:ring-primary/10 transition"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition disabled:opacity-50 shadow-sm"
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-xs text-gray-400 text-center"
        >
          Authorized administrators only
        </motion.p>
      </motion.div>
    </div>
  )
}
