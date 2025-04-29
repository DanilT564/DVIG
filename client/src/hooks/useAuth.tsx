import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// Интерфейсы для типизации
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Создание контекста авторизации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Провайдер для управления состоянием авторизации
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Проверка токена при первом рендеринге
  useEffect(() => {
    // Проверка на ранее сохраненные админские данные
    const isAdminStr = localStorage.getItem('isAdmin');
    if (isAdminStr === 'true') {
      console.log('Admin session found in localStorage');
      setUser({
        _id: 'admin123',
        name: 'Admin User',
        email: 'admin@example.com',
        isAdmin: true,
      });
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Проверка для тестового токена админа
        if (token === 'admin-mock-token-123456') {
          setUser({
            _id: 'admin123',
            name: 'Admin User',
            email: 'admin@example.com',
            isAdmin: true,
          });
          localStorage.setItem('isAdmin', 'true');
          setLoading(false);
          return;
        }
        
        // Для обычных токенов проверяем JWT
        const decoded = jwt_decode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          // Токен истек
          localStorage.removeItem('token');
          setUser(null);
        } else {
          // Токен действителен
          setUser({
            _id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            isAdmin: decoded.isAdmin,
          });
        }
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        console.error('Error decoding token:', err);
      }
    }
    setLoading(false);
  }, []);

  // Функция авторизации
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Добавляем проверку для админа без обращения к серверу
      // Принимаем ЛЮБОЙ пароль для admin@example.com
      if (email.trim().toLowerCase() === 'admin@example.com') {
        console.log('Admin login detected! Bypassing server check');
        // Мок данных для админа
        const adminUser = {
          _id: 'admin123',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true,
        };
        
        // Имитируем ответ от сервера (используем мок-токен)
        const mockToken = 'admin-mock-token-123456';
        localStorage.setItem('token', mockToken);
        localStorage.setItem('isAdmin', 'true');
        setUser(adminUser);
        
        // Перенаправляем на главную страницу
        navigate('/');
        return;
      }
      
      // Для остальных пользователей пробуем обратиться к серверу
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка авторизации');
      }
      
      // Сохраняем токен и информацию о пользователе
      localStorage.setItem('token', data.token);
      
      const decoded = jwt_decode<DecodedToken>(data.token);
      setUser({
        _id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      });
      
      // Перенаправляем на главную страницу
      navigate('/');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе в систему');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Функция регистрации
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }
      
      // Сохраняем токен и информацию о пользователе
      localStorage.setItem('token', data.token);
      
      const decoded = jwt_decode<DecodedToken>(data.token);
      setUser({
        _id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        isAdmin: decoded.isAdmin,
      });
      
      // Перенаправляем на главную страницу
      navigate('/');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Функция выхода из системы
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setUser(null);
    navigate('/');
  };

  // Значения контекста
  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Хук для использования авторизации в компонентах
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 