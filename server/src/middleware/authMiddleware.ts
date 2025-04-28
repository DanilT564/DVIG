import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User';

interface DecodedToken {
  id: string;
}

interface AuthRequest extends Request {
  user?: any;
}

// Middleware для защиты маршрутов, требующих аутентификации
export const protect = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Проверка наличия токена в заголовке
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Получение токена из заголовка
      token = req.headers.authorization.split(' ')[1];

      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      // Получение пользователя из базы данных (без пароля)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware для проверки прав администратора
export const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
}; 