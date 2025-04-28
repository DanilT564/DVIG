import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Типы
interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface DecodedToken {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  exp: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Создание контекста
export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isAdmin: false,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Проверка валидности токена
        const decoded = jwt_decode<DecodedToken>(token);
        
        // Проверка срока действия токена
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setLoading(false);
          return;
        }

        // Установка заголовка авторизации
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Получение данных пользователя
        const { data } = await axios.get(`${API_URL}/users/me`);
        setUser(data);
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
      
      setLoading(false);
    };

    verifyToken();
  }, [token]);

  // Функция для входа
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      const decoded = jwt_decode<DecodedToken>(data.token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      });
    } catch (error) {
      throw error;
    }
  };

  // Функция для регистрации
  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      
      const decoded = jwt_decode<DecodedToken>(data.token);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      });
    } catch (error) {
      throw error;
    }
  };

  // Функция для выхода
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  // Проверка, является ли пользователь администратором
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 