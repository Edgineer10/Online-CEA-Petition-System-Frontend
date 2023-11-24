import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useAuth();
  console.log(role);
  const content = allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/notallowed" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
