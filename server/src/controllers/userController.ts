import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import User from '../models/User';
import mongoose from 'mongoose';

// Интерфейс для запросов с аутентификацией
interface AuthRequest extends Request {
  user?: {
    _id: string | mongoose.Types.ObjectId;
    name?: string;
  };
}

// @desc    Аутентификация пользователя / получение токена
// @route   POST /api/users/login
// @access  Public
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Заглушка для демонстрации
  res.json({
    message: 'Пользователь аутентифицирован',
    email
  });
});

// @desc    Регистрация нового пользователя
// @route   POST /api/users/register
// @access  Public
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Заглушка для демонстрации
  res.json({
    message: 'Пользователь зарегистрирован',
    name,
    email
  });
});

// @desc    Получение профиля пользователя
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Профиль пользователя получен',
    userId: req.user?._id
  });
});

// @desc    Обновление профиля пользователя
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Профиль пользователя обновлен',
    userId: req.user?._id
  });
});

// @desc    Получение всех пользователей
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Список всех пользователей получен'
  });
});

// @desc    Удаление пользователя
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Пользователь удален',
    userId: req.params.id
  });
});

// @desc    Получение пользователя по ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Пользователь получен по ID',
    userId: req.params.id
  });
});

// @desc    Обновление пользователя
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  // Заглушка для демонстрации
  res.json({
    message: 'Пользователь обновлен',
    userId: req.params.id
  });
}); 