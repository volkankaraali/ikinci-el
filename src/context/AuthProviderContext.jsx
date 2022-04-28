import React, { createContext, useContext, useEffect, useState } from 'react';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');
    let token = useGetTokenFromCookie();
    //console.log('token :' + token);
    token && setAuth({ id, email, authToken: token });

  }, []);

  //console.log(auth);

  const values = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);