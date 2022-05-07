import React, { createContext, useContext, useEffect, useState } from 'react';
import useGetTokenFromCookie from '../hooks/useGetTokenFromCookie';
import { getUserMe } from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    //if there is token in cookie, that will be request to api to gets user info.
    let token = useGetTokenFromCookie();
    if (token) {
      const res = await getUserMe();
      setAuth({ id: res.data.id, email: res.data.email, authToken: token });
    }
    else {
      setAuth({});
    }
  };

  const values = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);