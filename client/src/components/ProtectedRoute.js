import React, { useEffect, useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const ProtectedRoute = ({ children, redirectTo, requiresAuth }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null means checking, false means not authorized
  const navigate = useNavigate();
  const token = localStorage.getItem('StocklyToken');
  const apiUrl = `${process.env.REACT_APP_API_URL}/protected`;

  const checkAuth = useCallback( async () => {
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuthorized(true);
    } catch (err) {
      localStorage.removeItem('StocklyUser');
      localStorage.removeItem('StocklyToken');
      setIsAuthorized(false);
    }
  },[apiUrl,token]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth,navigate]);

  if (isAuthorized === null) {
    return <Loader />;
  }

  if (requiresAuth && !isAuthorized) {
    return <Navigate to="/login" />;
  }

  if (!requiresAuth && isAuthorized) {
    return <Navigate to={redirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
