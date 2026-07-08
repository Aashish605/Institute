import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useContent } from '../context/ContentContext'
import { LOGIN } from '../config/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { motion } from "motion/react"

const Login = () => {
  useDocumentTitle('Login')
  const content = useContent();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/profile'
  const logIn = useSelector(state => state.auth.user)

  useEffect(() => {
    if (logIn) navigate(from, { replace: true })
  }, [logIn, navigate, from])

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-surface">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-4">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{content.login_heading || LOGIN.heading}</h1>
            <p className="text-sm text-text-secondary">{content.login_subtitle || LOGIN.subtitle}</p>
          </div>
          <a
            href="/auth/google"
            className="flex items-center justify-center gap-3 w-full px-6 py-3 rounded-lg border border-border bg-surface hover:bg-surface-alt transition-colors font-medium text-sm"
          >
            <img src="/google.png" alt="" className="w-5 h-5" />
            Continue with {LOGIN.buttonText}
          </a>
          <p className="text-xs text-text-muted text-center mt-6">{LOGIN.footer}</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
