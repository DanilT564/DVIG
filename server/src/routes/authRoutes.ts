import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Временные заглушки для контроллеров аутентификации
const login = (req: Request, res: Response) => res.json({ message: 'Вход в систему' });
const register = (req: Request, res: Response) => res.json({ message: 'Регистрация пользователя' });
const refreshToken = (req: Request, res: Response) => res.json({ message: 'Обновление токена' });
const logout = (req: Request, res: Response) => res.json({ message: 'Выход из системы' });

// Маршруты аутентификации
router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router; 