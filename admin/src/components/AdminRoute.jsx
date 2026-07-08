import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LoaderThree } from './ui/loader'

export default function AdminRoute() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <LoaderThree />
    </div>
  )

  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
