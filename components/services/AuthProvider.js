import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('userSession');
        const loginStatus = await AsyncStorage.getItem('isLogin');
        console.log(typeof loginStatus)
        if (userData && loginStatus === 'true') {
          setUser(JSON.parse(userData));
          setIsLogin(true);
        }
      } catch (error) {
        console.error("AsyncStorage couldn't be accessed!", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    setIsLogin(true);
    await AsyncStorage.setItem('userSession', JSON.stringify(userData));
    await AsyncStorage.setItem('isLogin', 'true');
  };

  const logout = async () => {
    setUser(null);
    setIsLogin(false);
    await AsyncStorage.removeItem('userSession');
    await AsyncStorage.setItem('isLogin', 'false');
  };

  return (
    <AuthContext.Provider value={{ user, isLogin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
