import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ authToken: 1 });

  const values = {
    auth,
    setAuth
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);