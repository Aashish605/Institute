import { NavLink } from 'react-router-dom'
import { FiGrid, FiBook, FiFileText, FiClipboard, FiCreditCard, FiMail, FiEdit3, FiLogOut } from 'react-icons/fi'
import api from '../config/api'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Dashboard', icon: FiGrid },
  { to: '/courses', label: 'Courses', icon: FiBook },
  { to: '/notices', label: 'Notices', icon: FiFileText },
  { to: '/mocks', label: 'Mock Results', icon: FiClipboard },
  { to: '/payments', label: 'Payments', icon: FiCreditCard },
  { to: '/contacts', label: 'Contacts', icon: FiMail },
  { to: '/content', label: 'Content', icon: FiEdit3 },
]

export default function Sidebar() {
  const { setUser } = useAuth()

  const handleLogout = () => {
    api.get('/auth/logout').finally(() => setUser(null))
  }

  return (
    <aside className="w-64 bg-primary text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/20">
        <h1 className="text-xl font-bold">Mirror Admin</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'}`
            }
          >
            <link.icon size={18} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 w-full transition"
        >
          <FiLogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  )
}
