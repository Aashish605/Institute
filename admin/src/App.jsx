import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
