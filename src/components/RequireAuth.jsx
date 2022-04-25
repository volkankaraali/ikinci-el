import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProviderContext';

function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  //if authcontext have a token that user profile page will be open if is not will be nagivate to login
  return (
    auth?.authToken
      ? <Outlet />
      : <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;