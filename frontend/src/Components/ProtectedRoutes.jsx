import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function RequireAuth() {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);
  const location = useLocation()

  if (loading) return <div className='min-h-[60vh] flex items-center justify-center text-4xl text-green-700 '>Loading Your Data</div>;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}