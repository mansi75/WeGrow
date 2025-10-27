import { Navigate, useLocation } from "react-router-dom";

/**
 * Wrap any protected element:
 * <PrivateRoute><Home /></PrivateRoute>
 */
export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
