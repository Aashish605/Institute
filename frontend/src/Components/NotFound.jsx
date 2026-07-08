import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <NavLink to="/" className="px-6 py-2 bg-[#f7921d] text-white rounded-lg font-semibold hover:bg-yellow-400 transition">
          Go Home
        </NavLink>
      </div>
    </div>
  )
}
