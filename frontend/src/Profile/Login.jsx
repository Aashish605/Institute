import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'motion/react'
import { Eye, EyeOff, Lock, Mail, UserRound, ArrowRight, Sparkles } from 'lucide-react'
import { useContent } from '../context/ContentContext'
import { LOGIN, API } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import api from '../config/api'
import { setUser } from '../Redux/Auth/AuthSlice'
import { Button } from '../Components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Components/ui/card'

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

      const response = await api.post(`/auth/${mode === 'signup' ? 'signup' : 'login'}`, payload)
      dispatch(setUser(response.data.user))
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to complete your request right now.')
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
              <CardTitle className="text-2xl font-semibold text-primary">{content.login_heading || LOGIN.heading}</CardTitle>
              <CardDescription className="text-sm text-text-secondary">{content.login_subtitle || LOGIN.subtitle}</CardDescription>
            </div>
            <div className="mx-auto flex w-full max-w-xs rounded-full bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => { setMode('login'); setError('') }}
                className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${mode === 'login' ? 'bg-primary text-white shadow' : 'text-text-secondary hover:text-primary'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError('') }}
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

              {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

              <Button type="submit" className="w-full gap-2" disabled={loading}>
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

export default Login
