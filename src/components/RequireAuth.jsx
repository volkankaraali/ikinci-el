import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProviderContext';


function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.id ? <Outlet /> : <Navigate to='login' state={{ from: location }} replace  ></Navigate>
  );
}

export default RequireAuth;