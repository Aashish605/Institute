import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Lock, Mail, Sparkles } from 'lucide-react'
import api from '../config/api'
import { Button } from '../Components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Components/ui/card'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [mode, setMode] = useState(token ? 'reset' : 'request')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRequest = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const response = await api.post('/auth/forgot-password', { email })
      setMessage(response.data.message)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to process your request.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/reset-password', { token, password })
      setMessage(response.data.message)
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to reset your password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.08),_transparent_60%)] px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">
        <Card className="border-border/70 bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-primary">{mode === 'reset' ? 'Reset your password' : 'Forgot password?'}</CardTitle>
              <CardDescription className="text-sm text-text-secondary">
                {mode === 'reset' ? 'Enter a new password for your account.' : 'We will send you a reset link for your account.'}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}
            {message && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</div>}

            {mode === 'request' ? (
              <form className="space-y-4" onSubmit={handleRequest}>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"><Mail className="h-4 w-4" /> Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                    required
                  />
                </label>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Please wait...' : 'Send reset link'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleReset}>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"><Lock className="h-4 w-4" /> New password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"><Lock className="h-4 w-4" /> Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                    required
                  />
                </label>

                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? 'Updating...' : 'Update password'}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            )}

            <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
