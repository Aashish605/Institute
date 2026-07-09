import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireAuth() {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const location = useLocation()

  if (loading) return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center gap-3'>
      <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity=".25" />
        <path d="M21 12a9 9 0 00-9-9" />
      </svg>
      <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Loading your profile...</p>
    </div>
  );
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}