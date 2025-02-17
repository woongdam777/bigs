import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const base64UrlDecode = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return decodeURIComponent(escape(atob(str)));
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      const payload = JSON.parse(base64UrlDecode(token.split('.')[1]));
      setUser({
        username: payload.username,
        name: payload.name
      });
      setIsLoggedIn(true);
    }
  }, []);

  const login = (accessToken) => {
    Cookies.set('accessToken', accessToken, { secure: true });
    const payload = JSON.parse(base64UrlDecode(accessToken.split('.')[1]));
    setUser({
      username: payload.username,
      name: payload.name
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
