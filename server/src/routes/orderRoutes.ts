import express from 'express';
import { Request, Response } from 'express';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Временные заглушки для контроллеров заказов
const getOrders = (req: Request, res: Response) => res.json({ message: 'Получение всех заказов' });
const getMyOrders = (req: Request, res: Response) => res.json({ message: 'Получение моих заказов' });
const getOrderById = (req: Request, res: Response) => res.json({ message: 'Получение заказа по ID' });
const createOrder = (req: Request, res: Response) => res.json({ message: 'Создание заказа' });
const updateOrderToPaid = (req: Request, res: Response) => res.json({ message: 'Обновление статуса оплаты заказа' });
const updateOrderToDelivered = (req: Request, res: Response) => res.json({ message: 'Обновление статуса доставки заказа' });

// Маршруты заказов
router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router; 