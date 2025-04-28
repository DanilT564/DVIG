import express from 'express';
import { Request, Response } from 'express';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Временные заглушки для контроллеров администратора
const getDashboardStats = (req: Request, res: Response) => 
  res.json({ message: 'Получение статистики для дашборда' });

const getOrderStats = (req: Request, res: Response) => 
  res.json({ message: 'Получение статистики заказов' });

const getUserStats = (req: Request, res: Response) => 
  res.json({ message: 'Получение статистики пользователей' });

const getProductStats = (req: Request, res: Response) => 
  res.json({ message: 'Получение статистики продуктов' });

// Маршруты админки
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/stats/orders', getOrderStats);
router.get('/stats/users', getUserStats);
router.get('/stats/products', getProductStats);

export default router; 