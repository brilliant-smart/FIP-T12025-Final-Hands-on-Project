import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const normalizedUserRole = user.role?.toLowerCase();
  const isAllowed = allowedRoles
    .map((role) => role.toLowerCase())
    .includes(normalizedUserRole);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
