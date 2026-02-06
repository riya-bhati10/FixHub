import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../Services/axiosInstance';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axiosInstance.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call logout API to blacklist token
        await axiosInstance.get('/auth/logout');
      }
    } catch (error) {
      } finally {
      // Clear user data regardless of API success/failure
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
