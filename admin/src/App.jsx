import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function App() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  if (isLogin) {
    return (
      <div className="min-h-screen">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-sm:p-4 pt-16 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
