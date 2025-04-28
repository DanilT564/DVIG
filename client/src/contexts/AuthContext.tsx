import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Интерфейс пользователя
export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

// Интерфейс для обновления профиля
interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
}

// Интерфейс контекста аутентификации
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: UpdateProfileData) => Promise<void>;
  clearError: () => void;
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Хук для использования контекста аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Провайдер контекста аутентификации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Инициализация состояния аутентификации из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.isAdmin || false);
      } catch (err) {
        console.error('Ошибка при разборе данных пользователя:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Настройка axios с токеном
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Логин пользователя
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin || false);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Ошибка при входе. Пожалуйста, проверьте email и пароль.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Регистрация пользователя
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      
      const { user, token } = response.data;
      
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      setIsAdmin(user.isAdmin || false);
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Ошибка при регистрации. Возможно, пользователь с таким email уже существует.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Выход из системы
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Обновление профиля пользователя
  const updateUserProfile = async (data: UpdateProfileData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.put(`${API_URL}/users/profile`, data);
      const updatedUser = response.data;
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        'Ошибка при обновлении профиля.'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Очистка ошибки
  const clearError = () => {
    setError(null);
  };

  // Значение контекста
  const value = {
    user,
    token,
    isAuthenticated,
    isAdmin,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 