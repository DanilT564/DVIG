import express from 'express';
import { Request, Response } from 'express';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Временная заглушка для контроллера загрузки файлов
const uploadFile = (req: Request, res: Response) => 
  res.json({ message: 'Загрузка файла' });

// Маршрут для загрузки файлов
router.post('/', protect, admin, uploadFile);

export default router; 