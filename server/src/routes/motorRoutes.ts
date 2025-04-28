import express from 'express';
import { 
  getMotors, 
  getMotorById, 
  createMotor, 
  updateMotor, 
  deleteMotor, 
  createMotorReview, 
  getTopMotors,
  getMotorsByCategory,
  getMotorCategories,
  getMotorBrands,
  getMotorManufacturers
} from '../controllers/motorController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes
router.route('/')
  .get(getMotors)
  .post(protect, admin, createMotor);

router.get('/top', getTopMotors);

router.get('/categories', getMotorCategories);
router.get('/brands', getMotorBrands);
router.get('/manufacturers', getMotorManufacturers);

router.get('/category/:category', getMotorsByCategory);

router.route('/:id')
  .get(getMotorById)
  .put(protect, admin, updateMotor)
  .delete(protect, admin, deleteMotor);

router.route('/:id/reviews')
  .post(protect, createMotorReview);

export default router; 