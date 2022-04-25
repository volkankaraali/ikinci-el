import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const getTokenFromCookie = () => {
    let cookie = document.cookie;
    let arr = cookie.split('=');
    return arr[1];
  };

  useEffect(() => {
    let email = localStorage.getItem('email');
    let id = localStorage.getItem('id');
    let token = getTokenFromCookie();
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