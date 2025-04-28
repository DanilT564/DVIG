import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import Motor from '../models/Motor';

// Define interfaces to match the model definitions
interface ReviewInterface {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
}

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface MotorInterface extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
  images: string[];
  brand: string;
  category: string;
  description: string;
  reviews: ReviewInterface[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  power: number;
  weight: number;
  dimensions: Dimensions;
  voltage: number;
  rpm: number;
  efficiency: number;
  fuelType?: string;
  manufacturer: string;
  yearOfManufacture: number;
  warranty: number;
  features: string[];
}

// Create a custom interface for authenticated requests
interface AuthRequest extends Request {
  user?: {
    _id: string | mongoose.Types.ObjectId;
    name?: string;
  };
}

// Extend Request query interface for motor search
interface MotorSearchQuery extends ParsedQs {
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
  order?: string;
}

interface RequestWithQuery extends Request {
  query: MotorSearchQuery;
}

// @desc    Fetch all motors
// @route   GET /api/motors
// @access  Public
const getMotors = asyncHandler(async (req: RequestWithQuery, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  let filter: any = {};

  if (req.query.keyword) {
    filter.$or = [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { description: { $regex: req.query.keyword, $options: 'i' } },
    ];
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.brand) {
    filter.brand = req.query.brand;
  }

  if (req.query.manufacturer) {
    filter.manufacturer = req.query.manufacturer;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }
    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }
  }

  if (req.query.minPower || req.query.maxPower) {
    filter.power = {};
    if (req.query.minPower) {
      filter.power.$gte = Number(req.query.minPower);
    }
    if (req.query.maxPower) {
      filter.power.$lte = Number(req.query.maxPower);
    }
  }

  let sort: any = {};

  if (req.query.sortBy) {
    const sortField = req.query.sortBy as string;
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    sort[sortField] = sortOrder;
  } else {
    sort = { createdAt: -1 }; // Default sort by newest
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
    total: count,
  });
});

// @desc    Fetch single motor
// @route   GET /api/motors/:id
// @access  Public
const getMotorById = asyncHandler(async (req: Request, res: Response) => {
  const motor = await Motor.findById(req.params.id);

  if (motor) {
    res.json(motor);
  } else {
    res.status(404);
    throw new Error('Motor not found');
  }
});

// @desc    Delete a motor
// @route   DELETE /api/motors/:id
// @access  Private/Admin
const deleteMotor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const motor = await Motor.findById(req.params.id);

  if (motor) {
    await motor.deleteOne();
    res.json({ message: 'Motor removed' });
  } else {
    res.status(404);
    throw new Error('Motor not found');
  }
});

// @desc    Create a motor
// @route   POST /api/motors
// @access  Private/Admin
const createMotor = asyncHandler(async (req: AuthRequest, res: Response) => {
  const motor = new Motor({
    user: req.user?._id,
    name: 'Sample Motor',
    price: 0,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'electric',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    power: 0,
    manufacturer: 'Sample manufacturer',
  });

  const createdMotor = await motor.save();
  res.status(201).json(createdMotor);
});

// @desc    Update a motor
// @route   PUT /api/motors/:id
// @access  Private/Admin
const updateMotor = asyncHandler(async (req: AuthRequest, res: Response) => {
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
    motor.name = name || motor.name;
    motor.price = price !== undefined ? price : motor.price;
    motor.description = description || motor.description;
    motor.image = image || motor.image;
    if (images) motor.images = images;
    motor.brand = brand || motor.brand;
    motor.category = category || motor.category;
    motor.countInStock = countInStock !== undefined ? countInStock : motor.countInStock;
    motor.power = power !== undefined ? power : motor.power;
    if (weight !== undefined) motor.weight = weight;
    if (dimensions) motor.dimensions = dimensions;
    if (voltage !== undefined) motor.voltage = voltage;
    if (rpm !== undefined) motor.rpm = rpm;
    if (efficiency !== undefined) motor.efficiency = efficiency;
    if (fuelType) motor.fuelType = fuelType;
    motor.manufacturer = manufacturer || motor.manufacturer;
    if (yearOfManufacture !== undefined) motor.yearOfManufacture = yearOfManufacture;
    if (warranty !== undefined) motor.warranty = warranty;
    if (features) motor.features = features;

    const updatedMotor = await motor.save();
    res.json(updatedMotor);
  } else {
    res.status(404);
    throw new Error('Motor not found');
  }
});

// @desc    Create new review
// @route   POST /api/motors/:id/reviews
// @access  Private
const createMotorReview = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { rating, comment } = req.body;

  const motor = await Motor.findById(req.params.id);

  if (motor) {
    const alreadyReviewed = motor.reviews.find(
      (r) => r.user.toString() === req.user?._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Motor already reviewed');
    }

    const review: ReviewInterface = {
      name: req.user?.name || 'Anonymous',
      rating: Number(rating),
      comment,
      user: req.user?._id as unknown as mongoose.Schema.Types.ObjectId,
    };

    motor.reviews.push(review);

    motor.numReviews = motor.reviews.length;

    motor.rating =
      motor.reviews.reduce((acc, item) => acc + item.rating, 0) /
      motor.reviews.length;

    await motor.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Motor not found');
  }
});

// @desc    Get top rated motors
// @route   GET /api/motors/top
// @access  Public
const getTopMotors = asyncHandler(async (req: Request, res: Response) => {
  const motors = await Motor.find({}).sort({ rating: -1 }).limit(5);

  res.json(motors);
});

// @desc    Get motors by category
// @route   GET /api/motors/category/:category
// @access  Public
const getMotorsByCategory = asyncHandler(async (req: Request, res: Response) => {
  const category = req.params.category;
  const motors = await Motor.find({ category });

  if (motors && motors.length > 0) {
    res.json(motors);
  } else {
    res.status(404);
    throw new Error(`No motors found in category ${category}`);
  }
});

// @desc    Get motors by brand
// @route   GET /api/motors/brand/:brand
// @access  Public
const getMotorsByBrand = asyncHandler(async (req: Request, res: Response) => {
  const brand = req.params.brand;
  const motors = await Motor.find({ brand });

  if (motors && motors.length > 0) {
    res.json(motors);
  } else {
    res.status(404);
    throw new Error(`No motors found for brand ${brand}`);
  }
});

// @desc    Get all unique motor categories
// @route   GET /api/motors/categories
// @access  Public
const getMotorCategories = asyncHandler(async (req: Request, res: Response) => {
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

// @desc    Get all unique motor brands
// @route   GET /api/motors/brands
// @access  Public
const getMotorBrands = asyncHandler(async (req: Request, res: Response) => {
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

// @desc    Get all unique motor manufacturers
// @route   GET /api/motors/manufacturers
// @access  Public
const getMotorManufacturers = asyncHandler(async (req: Request, res: Response) => {
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

export {
  getMotors,
  getMotorById,
  deleteMotor,
  createMotor,
  updateMotor,
  createMotorReview,
  getTopMotors,
  getMotorsByCategory,
  getMotorsByBrand,
  getMotorCategories,
  getMotorBrands,
  getMotorManufacturers,
}; 