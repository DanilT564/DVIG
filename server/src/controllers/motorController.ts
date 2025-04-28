import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Motor from '../models/Motor';
import { Request, Response } from 'express';

// Create a custom interface for authenticated requests
interface AuthRequest extends Request {
  user?: {
    _id: string | mongoose.Types.ObjectId;
    name?: string;
  };
}

// Расширенный интерфейс для запросов с фильтрацией
interface FilteredRequest extends Request {
  query: {
    keyword?: string;
    page?: string;
    category?: string;
    brand?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
    minPower?: string;
    maxPower?: string;
    sortBy?: string;
  };
}

// @desc    Fetch all motors
// @route   GET /api/motors
// @access  Public
export const getMotors = asyncHandler(async (req: FilteredRequest, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  // Построение фильтра
  let filter: any = {};

  // Поиск по ключевому слову (в названии или описании)
  if (req.query.keyword) {
    filter.$or = [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
    ];
  }

  // Фильтрация по категории
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Фильтрация по бренду
  if (req.query.brand) {
    filter.brand = req.query.brand;
  }

  // Фильтрация по производителю
  if (req.query.manufacturer) {
    filter.manufacturer = req.query.manufacturer;
  }

  // Фильтрация по цене
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }
  }

  // Фильтрация по мощности
  if (req.query.minPower || req.query.maxPower) {
    filter.power = {};
    if (req.query.minPower) {
      filter.power.$gte = Number(req.query.minPower);
    }
    if (req.query.maxPower) {
      filter.power.$lte = Number(req.query.maxPower);
    }
  }

  // Определение сортировки
  let sort = {};
  if (req.query.sortBy) {
    switch (req.query.sortBy) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'rating_desc':
        sort = { rating: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      case 'power_asc':
        sort = { power: 1 };
        break;
      case 'power_desc':
        sort = { power: -1 };
        break;
      default:
        sort = { createdAt: -1 }; // По умолчанию сначала новые
    }
  } else {
    sort = { createdAt: -1 };
  }

  const count = await Motor.countDocuments(filter);
  const motors = await Motor.find(filter)
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    motors,
    page,
    pages: Math.ceil(count / pageSize),
    totalCount: count,
  });
});

// @desc    Fetch single motor
// @route   GET /api/motors/:id
// @access  Public
export const getMotorById = asyncHandler(async (req: Request, res: Response) => {
  const motor = await Motor.findById(req.params.id);

  if (motor) {
    res.json(motor);
  } else {
    res.status(404);
    throw new Error('Мотор не найден');
  }
});

// @desc    Delete a motor
// @route   DELETE /api/motors/:id
// @access  Private/Admin
export const deleteMotor = asyncHandler(async (req: Request, res: Response) => {
  const motor = await Motor.findById(req.params.id);

  if (motor) {
    await Motor.deleteOne({ _id: motor._id });
    res.json({ message: 'Мотор удален' });
  } else {
    res.status(404);
    throw new Error('Мотор не найден');
  }
});

// @desc    Create a motor
// @route   POST /api/motors
// @access  Private/Admin
export const createMotor = asyncHandler(async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Не авторизован');
  }

  const motor = new Motor({
    name: 'Название мотора',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Бренд',
    category: 'electric',
    countInStock: 0,
    numReviews: 0,
    description: 'Описание мотора',
    power: 100,
    weight: 50,
    dimensions: {
      length: 200,
      width: 150,
      height: 150,
    },
    manufacturer: 'Производитель',
    yearOfManufacture: new Date().getFullYear(),
    warranty: 12,
    features: ['Особенность 1', 'Особенность 2'],
  });

  const createdMotor = await motor.save();
  res.status(201).json(createdMotor);
});

// @desc    Update a motor
// @route   PUT /api/motors/:id
// @access  Private/Admin
export const updateMotor = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    price,
    description,
    image,
    images,
    brand,
    category,
    countInStock,
    power,
    weight,
    dimensions,
    voltage,
    rpm,
    efficiency,
    fuelType,
    manufacturer,
    yearOfManufacture,
    warranty,
    features,
  } = req.body;

  const motor = await Motor.findById(req.params.id);

  if (motor) {
    // Обновление основных полей
    motor.name = name || motor.name;
    motor.price = price || motor.price;
    motor.description = description || motor.description;
    motor.image = image || motor.image;
    
    // Обновление изображений, если предоставлены
    if (images && images.length > 0) {
      motor.images = images;
    }
    
    motor.brand = brand || motor.brand;
    motor.category = category || motor.category;
    motor.countInStock = countInStock || motor.countInStock;
    
    // Обновление технических характеристик
    motor.power = power || motor.power;
    motor.weight = weight !== undefined ? weight : motor.weight;
    
    // Обновление размеров, если предоставлены
    if (dimensions) {
      motor.dimensions.length = dimensions.length || motor.dimensions.length;
      motor.dimensions.width = dimensions.width || motor.dimensions.width;
      motor.dimensions.height = dimensions.height || motor.dimensions.height;
    }
    
    // Обновление дополнительных технических характеристик
    if (voltage !== undefined) motor.voltage = voltage;
    if (rpm !== undefined) motor.rpm = rpm;
    if (efficiency !== undefined) motor.efficiency = efficiency;
    if (fuelType) motor.fuelType = fuelType;
    
    // Обновление информации о производителе и гарантии
    motor.manufacturer = manufacturer || motor.manufacturer;
    if (yearOfManufacture) motor.yearOfManufacture = yearOfManufacture;
    if (warranty !== undefined) motor.warranty = warranty;
    
    // Обновление особенностей продукта
    if (features && features.length > 0) {
      motor.features = features;
    }

    const updatedMotor = await motor.save();
    res.json(updatedMotor);
  } else {
    res.status(404);
    throw new Error('Мотор не найден');
  }
});

// @desc    Create new review
// @route   POST /api/motors/:id/reviews
// @access  Private
export const createMotorReview = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { rating, comment } = req.body;

    if (!req.user) {
      res.status(401);
      throw new Error('Не авторизован');
    }

    const motor = await Motor.findById(req.params.id);

    if (motor) {
      const alreadyReviewed = motor.reviews.find(
        (r: any) => r.user.toString() === req.user?._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Вы уже оставили отзыв на этот мотор');
      }

      const review = {
        name: req.body.name || req.user.name || 'Анонимный пользователь',
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      motor.reviews.push(review as any);
      motor.numReviews = motor.reviews.length;

      // Вручную рассчитываем рейтинг
      motor.rating =
        motor.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
        motor.reviews.length;

      await motor.save();
      res.status(201).json({ message: 'Отзыв добавлен' });
    } else {
      res.status(404);
      throw new Error('Мотор не найден');
    }
  }
);

// @desc    Get top rated motors
// @route   GET /api/motors/top
// @access  Public
export const getTopMotors = asyncHandler(async (req: Request, res: Response) => {
  const motors = await Motor.find({}).sort({ rating: -1 }).limit(5);

  res.json(motors);
});

// @desc    Get motors by category
// @route   GET /api/motors/category/:category
// @access  Public
export const getMotorsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const motors = await Motor.find({ category: req.params.category });

  if (motors && motors.length > 0) {
    res.json(motors);
  } else {
    res.status(404);
    throw new Error('Моторы в данной категории не найдены');
  }
});

// @desc    Get motor categories
// @route   GET /api/motors/categories
// @access  Public
export const getMotorCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Motor.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  res.json(categories);
});

// @desc    Get motor brands
// @route   GET /api/motors/brands
// @access  Public
export const getMotorBrands = asyncHandler(async (req: Request, res: Response) => {
  const brands = await Motor.aggregate([
    {
      $group: {
        _id: '$brand',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  res.json(brands);
});

// @desc    Get motor manufacturers
// @route   GET /api/motors/manufacturers
// @access  Public
export const getMotorManufacturers = asyncHandler(async (req: Request, res: Response) => {
  const manufacturers = await Motor.aggregate([
    {
      $group: {
        _id: '$manufacturer',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        name: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  res.json(manufacturers);
}); 