// src/routes/ProtectedRoute.jsx
import { useContext,useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on mount
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated && !auth.isLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [auth.isLoggedIn, navigate]);

  if (!auth.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;