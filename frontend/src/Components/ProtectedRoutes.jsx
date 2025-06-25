import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading); // Add loading to your slice if not present

  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RequireAdmin() {
  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  if (loading) return <div>Loading...</div>;
  return user?.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}