import React, { createContext, useContext, useEffect, useState } from 'react';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';
import { getUserMe } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});


  useEffect(() => {
    let token = useGetTokenFromCookie();
    token && getUserInfo(token);
  }, []);



  const getUserInfo = async (token) => {
    //if there is token in cookie, that will be request to api to gets user info.
    const res = await getUserMe();
    setAuth({ id: res.data.id, email: res.data.email, authToken: token });
  };

  const values = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);