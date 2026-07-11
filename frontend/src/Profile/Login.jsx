import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { Eye, EyeOff, Lock, Mail, UserRound, ArrowRight, Sparkles, AlertCircle } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { LOGIN, API } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import api from '../config/api'
import { setUser } from '../Redux/Auth/AuthSlice'
import { Button } from '../Components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Components/ui/card'
import VerifyEmailNotice from './VerifyEmailNotice'

const Login = () => {
  useDocumentTitle('Login')
  const content = useContent();
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const from = location.state?.from?.pathname || '/profile'
  const logIn = useSelector(state => state.auth.user)

  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  // After signup success, show the verify-email notice
  const [pendingEmail, setPendingEmail] = useState(null)
  // After login attempt with unverified account
  const [unverifiedEmail, setUnverifiedEmail] = useState(null)

  // Read ?verified= query param from email-verification redirect
  const searchParams = new URLSearchParams(location.search)
  const verifiedStatus = searchParams.get('verified') // 'true' | 'invalid' | 'expired'

  useEffect(() => {
    if (logIn) navigate(from, { replace: true })
  }, [logIn, navigate, from])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setUnverifiedEmail(null)

    if (mode === 'signup') {
      if (!form.name.trim()) {
        setError('Please enter your full name.')
        return
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setLoading(true)

    try {
      const payload = mode === 'signup'
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password }

      if (mode === 'signup') {
        const response = await api.post('/auth/signup', payload)
        // Don't log in — show verify-email notice
        setPendingEmail(response.data.email || form.email)
      } else {
        const response = await api.post('/auth/login', payload)
        dispatch(setUser(response.data.user))
        navigate(from, { replace: true })
      }
    } catch (err) {
      const data = err.response?.data
      if (data?.unverified) {
        setUnverifiedEmail(form.email)
        setError(data.message || 'Please verify your email before logging in.')
      } else {
        setError(data?.message || 'Unable to complete your request right now.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Show the "check your inbox" screen after successful signup
  if (pendingEmail) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.08),_transparent_60%)] px-4 py-24 sm:px-6 lg:px-8">
        <VerifyEmailNotice
          email={pendingEmail}
          onBack={() => { setPendingEmail(null); setMode('login') }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(0,78,143,0.08),_transparent_60%)] px-4 py-24 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto w-full max-w-md">

        {/* Verified success banner */}
        {verifiedStatus === 'true' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 flex items-center gap-2"
          >
            <span className="text-green-500 text-lg">✓</span>
            Email verified! You can now log in.
          </motion.div>
        )}

        {verifiedStatus === 'expired' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
          >
            Your verification link has expired. Please sign up again or request a new link.
          </motion.div>
        )}

        {verifiedStatus === 'invalid' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            This verification link is invalid or has already been used.
          </motion.div>
        )}

        <Card className="border-border/70 bg-white/90 shadow-2xl shadow-slate-200/70 backdrop-blur">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-primary">{content.login_heading || LOGIN.heading}</CardTitle>
              <CardDescription className="text-sm text-text-secondary">{content.login_subtitle || LOGIN.subtitle}</CardDescription>
            </div>
            <div className="mx-auto flex w-full max-w-xs rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); setUnverifiedEmail(null) }}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-primary'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); setUnverifiedEmail(null) }}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'signup' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-primary'}`}
              >
                Sign up
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"> <UserRound className="h-4 w-4" /> Full name</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"> <Mail className="h-4 w-4" /> Email address</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"> <Lock className="h-4 w-4" /> Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 pr-12 text-sm outline-none transition focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              {mode === 'signup' && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-text"> <Lock className="h-4 w-4" /> Confirm password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary"
                    required
                  />
                </label>
              )}

              {/* Unverified email banner with resend option */}
              {unverifiedEmail && (
                <UnverifiedBanner
                  email={unverifiedEmail}
                  onResent={() => setPendingEmail(unverifiedEmail)}
                />
              )}

              {error && !unverifiedEmail && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
              )}

              <Button type="submit" className="w-full gap-2 text-white" disabled={loading}>
                {loading ? 'Please wait...' : mode === 'signup' ? 'Create account' : 'Sign in'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <span className="relative bg-white px-3 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">or continue with</span>
            </div>

            <a
              href={`${API.baseURL}/auth/google`}
              className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-text transition hover:bg-surface-alt"
            >
              <img src="/google.png" alt="" className="h-5 w-5" />
              Continue with Google
            </a>

            <p className="text-center text-xs text-text-muted">{LOGIN.footer}</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Inline banner shown when a login attempt is made with an unverified email
const UnverifiedBanner = ({ email, onResent }) => {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleResend = async () => {
    setStatus('sending')
    try {
      await api.post('/auth/resend-verification', { email })
      setStatus('sent')
      // After 1.5s, flip to the full "check inbox" screen
      setTimeout(() => onResent(), 1500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
      <div className="flex items-start gap-2 mb-2">
        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-amber-500" />
        <span>Your email address hasn't been verified yet. Please check your inbox or request a new link.</span>
      </div>
      <button
        type="button"
        onClick={handleResend}
        disabled={status === 'sending' || status === 'sent'}
        className="w-full rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-60 transition"
      >
        {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent! Redirecting…' : status === 'error' ? 'Failed — try again' : 'Resend verification email'}
      </button>
    </div>
  )
}

export default Login
