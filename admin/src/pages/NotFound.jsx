import { NavLink } from 'react-router-dom'
import { motion } from 'motion/react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          className="text-8xl font-bold text-primary/10 mb-4"
        >
          404
        </motion.h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <NavLink to="/" className="inline-block px-6 py-2 bg-secondary text-white rounded-lg font-semibold hover:bg-secondary/90 transition shadow-sm">
          Go Home
        </NavLink>
      </motion.div>
    </div>
  )
}
