import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We couldn't load the content you're looking for. Please try again.", 
  onRetry = null,
  showHome = false,
  icon: Icon = AlertCircle
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-12 text-center shadow-lg">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/10 mb-6"
          >
            <Icon className="w-8 h-8 text-error" />
          </motion.div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-text mb-3">{title}</h2>

          {/* Message */}
          <p className="text-text-secondary mb-8 leading-relaxed">{message}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRetry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </motion.button>
            )}
            
            {showHome && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border text-text-secondary font-semibold hover:bg-surface transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-xs text-text-muted">Error Code: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ErrorState
