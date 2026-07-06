import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-lg font-semibold text-gray-500">Loading...</span>
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
