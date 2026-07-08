import { NavLink } from 'react-router-dom'
import { motion } from "motion/react"

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-surface">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center px-4">
        <div className="text-8xl sm:text-9xl font-bold text-text-muted/20 mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <NavLink to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Go Home
        </NavLink>
      </motion.div>
    </div>
  )
}
