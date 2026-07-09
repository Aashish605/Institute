import { NavLink, useLocation } from 'react-router-dom'
import { FiGrid, FiBook, FiFileText, FiClipboard, FiCreditCard, FiMail, FiEdit3, FiStar, FiUsers, FiUserCheck, FiLogOut } from 'react-icons/fi'
import { IconMenu2, IconX } from '@tabler/icons-react'
import api from '../config/api'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const links = [
  { to: '/', label: 'Dashboard', icon: FiGrid },
  { to: '/courses', label: 'Courses', icon: FiBook },
  { to: '/notices', label: 'Notices', icon: FiFileText },
  { to: '/mocks', label: 'Mock Results', icon: FiClipboard },
  { to: '/payments', label: 'Payments', icon: FiCreditCard },
  { to: '/contacts', label: 'Contacts', icon: FiMail },
  { to: '/content', label: 'Content', icon: FiEdit3 },
  { to: '/users', label: 'Users', icon: FiUsers },
  { to: '/enrollments', label: 'Enrollments', icon: FiUserCheck },
  { to: '/testimonials', label: 'Testimonials', icon: FiStar },
]

export default function Sidebar() {
  const { setUser } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const location = useLocation()

  const handleLogout = () => {
    api.get('/auth/logout').finally(() => setUser(null))
  }

  const isExpanded = hovered || sidebarOpen

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <motion.h1
          animate={{ opacity: isExpanded ? 1 : 0, display: isExpanded ? 'block' : 'none' }}
          className="text-xl font-bold whitespace-nowrap"
        >
          Mirror Admin
        </motion.h1>
        <motion.div
          animate={{ opacity: isExpanded ? 0 : 1, display: isExpanded ? 'none' : 'block' }}
          className="text-xl font-bold"
        >
          M
        </motion.div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-hidden">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
                isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
              }`
            }
          >
            <link.icon size={18} className="shrink-0" />
            <motion.span
              animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              {link.label}
            </motion.span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 w-full transition-all duration-200 whitespace-nowrap"
        >
          <FiLogOut size={18} className="shrink-0" />
          <motion.span
            animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            Log Out
          </motion.span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ width: isExpanded ? 240 : 72 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col bg-primary text-white min-h-screen shrink-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-primary text-white rounded-lg shadow-lg"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-64 bg-primary text-white h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
