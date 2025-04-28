import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order, { IOrder } from '../models/Order';
import Motor from '../models/Motor';
import { IUser } from '../models/User';

// Расширенный интерфейс запроса с пользователем
interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Создание нового заказа
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice 
  } = req.body;

  // Проверка наличия товаров в заказе
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Заказ не содержит товаров');
  }

  // Создаем новый заказ
  const order = new Order({
    user: req.user?._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    status: 'pending', // Добавляем начальный статус
  });

  // Генерируем номер заказа
  const orderCount = await Order.countDocuments();
  order.orderNumber = String(orderCount + 1).padStart(6, '0');

  // Уменьшаем количество товаров на складе
  for (const item of orderItems) {
    const motor = await Motor.findById(item.product);
    if (motor) {
      motor.countInStock -= item.quantity;
      await motor.save();
    }
  }

  // Сохраняем заказ в базе данных
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Получение заказа по ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    // Проверяем права доступа (только владелец заказа или админ)
    if (!req.user) {
      res.status(401);
      throw new Error('Не авторизован');
    }
    
    if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
      res.json(order);
    } else {
      res.status(403);
      throw new Error('Доступ запрещен');
    }
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc    Обновление статуса оплаты заказа
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    order.status = 'processing';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc    Обновление статуса доставки заказа
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = new Date();
    order.status = 'delivered';

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc    Получение заказов пользователя
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Не авторизован');
  }
  
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Получение всех заказов
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc    Обновление статуса заказа
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = status;

    // Если статус "доставлен", обновляем соответствующие флаги
    if (status === 'delivered') {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    // Если статус "отменен", возвращаем товары на склад
    if (status === 'cancelled' && !order.isRefunded) {
      for (const item of order.orderItems) {
        const motor = await Motor.findById(item.product);
        if (motor) {
          motor.countInStock += item.quantity;
          await motor.save();
        }
      }
      order.isRefunded = true;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

// @desc    Удаление заказа
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Если заказ уже оплачен, возвращаем товары на склад
    if (order.isPaid && !order.isRefunded) {
      for (const item of order.orderItems) {
        const motor = await Motor.findById(item.product);
        if (motor) {
          motor.countInStock += item.quantity;
          await motor.save();
        }
      }
    }

    await order.deleteOne(); // Заменяем устаревший метод remove()
    res.json({ message: 'Заказ удален' });
  } else {
    res.status(404);
    throw new Error('Заказ не найден');
  }
});

export {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  deleteOrder,
}; 