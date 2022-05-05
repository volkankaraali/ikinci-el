import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
//import { useAuth } from '../context/AuthProviderContext';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';


function RequireAuth() {
  //const { auth } = useAuth();
  const location = useLocation();

  const token = useGetTokenFromCookie();

  return (
    token ? <Outlet /> : <Navigate to='login' state={{ from: location }} replace></Navigate>
  );
}

export default RequireAuth;