import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  usageCount: number;
  incrementUsage: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUsageCount(0);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password });
    setToken(res.data.accessToken);
    setUsageCount(0);
  };

  const register = async (email: string, password: string) => {
    await axios.post('/auth/register', { email, password });
  };

  const logout = () => setToken(null);

  const incrementUsage = () => setUsageCount((prev) => prev + 1);

  return (
    <AuthContext.Provider value={{ token, login, register, logout, isLoggedIn: !!token, usageCount, incrementUsage }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};