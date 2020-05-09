import React, { createContext, useState, useEffect, useContext } from 'react';

import api from '../services/api';
import refreshTokenIfNeed from '../utils/refreshToken';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const userLogged = localStorage.getItem('@GenericLogin:user');
    const tokenFromUserLogged = localStorage.getItem('@GenericLogin:token');
    const refreshTokenFromUserLogged = localStorage.getItem('@GenericLogin:refreshToken');

    if(userLogged !== null && tokenFromUserLogged !== null && refreshTokenFromUserLogged !== null) {
      setUser(JSON.parse(userLogged));
      setToken(tokenFromUserLogged);
      setRefreshToken(refreshTokenFromUserLogged);
    }
  }, []);

  async function userLogin(login, password) {
    try {
      const response = await api.post('/login', {
        login, password
      });

      setUser(response.data.user);
      setToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);

      localStorage.setItem('@GenericLogin:user', JSON.stringify(response.data.user));
      localStorage.setItem('@GenericLogin:token', response.data.accessToken);
      localStorage.setItem('@GenericLogin:refreshToken', response.data.refreshToken);
    } catch(error) {
      throw error.response.data.error;
    }
  }

  async function userRegister(name, login, password) {
    try {
      const response = await api.post('/register', {
        name, login, password
      });

      setUser(response.data.user);
      setToken(response.data.token);
      setRefreshToken(response.data.refreshToken);

      localStorage.setItem('@GenericLogin:user', JSON.stringify(response.data.user));
      localStorage.setItem('@GenericLogin:token', response.data.accessToken);
      localStorage.setItem('@GenericLogin:refreshToken', response.data.refreshToken);
    } catch(error) {
      throw error.response.data.error;
    }
  }

  async function updateUser(name, login, message, tokenToUse = token) {
    const userName = name;
    const userLogin = login;
    const userMessage = message;

    try {
      const response = await api.put('/user', {
        name: userName,
        login: userLogin,
        message: userMessage,
      }, {
        headers: {
          authorization: `Bearer ${tokenToUse}`
        }
      });

      localStorage.setItem('@GenericLogin:user', JSON.stringify(response.data.user));
      setUser(response.data.user);
    } catch(error) {
      if(error.response.data.error !== 'Invalid token') return;

      const responseFromRefreshToken = await refreshTokenIfNeed(refreshToken, user._id);

      setToken(responseFromRefreshToken.accessToken);

      updateUser(userName, userLogin, userMessage, responseFromRefreshToken.accessToken);
    }
  }

  async function logout() {
    await api.post('/logout', {
      refreshToken
    });

    setUser(null);
    setToken('');
    setRefreshToken('');

    localStorage.clear();
  }

  async function deleteUser(tokenToUse = token) {
    try {
      setUser(null);
      setToken('');
      setRefreshToken('');

      localStorage.clear();
      
      const response = await api.delete('/user', {
        headers: {
          authorization: `Bearer ${tokenToUse}`
        }
      });
    } catch(error) {
      if(error.response.data.error !== 'Invalid token') return;

      const responseFromRefreshToken = await refreshTokenIfNeed(refreshToken, user._id);

      deleteUser(responseFromRefreshToken.accessToken);
    }
  }

  return(
    <AuthContext.Provider value={{
      signed: !!user, user, token,
      userLogin, userRegister, updateUser, logout, deleteUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
