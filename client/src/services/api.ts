import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена в запросы
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерфейсы для данных
export interface Motor {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  category: string;
  manufacturer: string;
  power: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  voltage?: number;
  rpm?: number;
  efficiency?: number;
  fuelType?: string;
  yearOfManufacture?: number;
  warranty?: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews: Review[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  // Новые поля для соответствия дизайну motors774
  isNew?: boolean;
  isRefurbished?: boolean;
  model?: string;
  volume?: number; // объем двигателя в литрах
  year?: number; // год выпуска
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Order {
  _id: string;
  user: string;
  items: {
    motor: Motor;
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
  };
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

// API сервисы
export const motorService = {
  // Получение всех моторов с фильтрацией
  getAllMotors: async (params?: {
    page?: number;
    keyword?: string;
    category?: string;
    brand?: string;
    manufacturer?: string;
    minPrice?: number;
    maxPrice?: number;
    minPower?: number;
    maxPower?: number;
    sortBy?: string;
  }) => {
    const response = await api.get('/motors', { params });
    return response.data;
  },

  // Получение мотора по ID
  getMotorById: async (id: string) => {
    const response = await api.get(`/motors/${id}`);
    return response.data;
  },

  // Получение топовых моторов
  getTopMotors: async () => {
    const response = await api.get('/motors/top');
    return response.data;
  },

  // Получение моторов по категории
  getMotorsByCategory: async (category: string) => {
    const response = await api.get(`/motors/category/${category}`);
    return response.data;
  },

  // Получение категорий моторов
  getMotorCategories: async () => {
    const response = await api.get('/motors/categories');
    return response.data;
  },

  // Получение брендов моторов
  getMotorBrands: async () => {
    const response = await api.get('/motors/brands');
    return response.data;
  },

  // Получение производителей моторов
  getMotorManufacturers: async () => {
    const response = await api.get('/motors/manufacturers');
    return response.data;
  },

  // Создание отзыва о моторе
  createMotorReview: async (id: string, review: { rating: number; comment: string; name?: string }) => {
    const response = await api.post(`/motors/${id}/reviews`, review);
    return response.data;
  },
};

export const orderService = {
  // Создание заказа
  createOrder: async (orderData: {
    items: { motorId: string; quantity: number }[];
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: string;
  }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Получение заказа по ID
  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Получение заказов пользователя
  getUserOrders: async () => {
    const response = await api.get('/orders/myorders');
    return response.data;
  },

  // Обновление статуса оплаты заказа
  updateOrderToPaid: async (id: string, paymentResult: { id: string; status: string; updateTime: string }) => {
    const response = await api.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
  },
};

export const userService = {
  // Получение профиля пользователя
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Обновление профиля пользователя
  updateUserProfile: async (userData: { name?: string; email?: string; password?: string }) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
};

export const adminService = {
  // Получение всех пользователей (только для администратора)
  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  // Удаление пользователя (только для администратора)
  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },

  // Получение пользователя по ID (только для администратора)
  getUserById: async (id: string) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Обновление пользователя (только для администратора)
  updateUser: async (id: string, userData: { name?: string; email?: string; isAdmin?: boolean }) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
  },

  // Создание нового мотора (только для администратора)
  createMotor: async (motorData: Partial<Motor>) => {
    const response = await api.post('/motors', motorData);
    return response.data;
  },

  // Удаление мотора (только для администратора)
  deleteMotor: async (id: string) => {
    const response = await api.delete(`/motors/${id}`);
    return response.data;
  },

  // Обновление мотора (только для администратора)
  updateMotor: async (id: string, motorData: Partial<Motor>) => {
    const response = await api.put(`/motors/${id}`, motorData);
    return response.data;
  },

  // Получение всех заказов (только для администратора)
  getAllOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  // Обновление статуса доставки заказа (только для администратора)
  updateOrderToDelivered: async (id: string) => {
    const response = await api.put(`/admin/orders/${id}/deliver`);
    return response.data;
  },
};

export default api; 