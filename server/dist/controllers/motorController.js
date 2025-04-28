"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMotorManufacturers = exports.getMotorBrands = exports.getMotorCategories = exports.getMotorsByCategory = exports.getTopMotors = exports.createMotorReview = exports.updateMotor = exports.createMotor = exports.deleteMotor = exports.getMotorById = exports.getMotors = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Motor_1 = __importDefault(require("../models/Motor"));
exports.getMotors = (0, express_async_handler_1.default)(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;
    let filter = {};
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
                sort = { createdAt: -1 };
        }
    }
    else {
        sort = { createdAt: -1 };
    }
    const count = await Motor_1.default.countDocuments(filter);
    const motors = await Motor_1.default.find(filter)
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
exports.getMotorById = (0, express_async_handler_1.default)(async (req, res) => {
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        res.json(motor);
    }
    else {
        res.status(404);
        throw new Error('Мотор не найден');
    }
});
exports.deleteMotor = (0, express_async_handler_1.default)(async (req, res) => {
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        await Motor_1.default.deleteOne({ _id: motor._id });
        res.json({ message: 'Мотор удален' });
    }
    else {
        res.status(404);
        throw new Error('Мотор не найден');
    }
});
exports.createMotor = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Не авторизован');
    }
    const motor = new Motor_1.default({
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
exports.updateMotor = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, price, description, image, images, brand, category, countInStock, power, weight, dimensions, voltage, rpm, efficiency, fuelType, manufacturer, yearOfManufacture, warranty, features, } = req.body;
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        motor.name = name || motor.name;
        motor.price = price || motor.price;
        motor.description = description || motor.description;
        motor.image = image || motor.image;
        if (images && images.length > 0) {
            motor.images = images;
        }
        motor.brand = brand || motor.brand;
        motor.category = category || motor.category;
        motor.countInStock = countInStock || motor.countInStock;
        motor.power = power || motor.power;
        motor.weight = weight !== undefined ? weight : motor.weight;
        if (dimensions) {
            motor.dimensions.length = dimensions.length || motor.dimensions.length;
            motor.dimensions.width = dimensions.width || motor.dimensions.width;
            motor.dimensions.height = dimensions.height || motor.dimensions.height;
        }
        if (voltage !== undefined)
            motor.voltage = voltage;
        if (rpm !== undefined)
            motor.rpm = rpm;
        if (efficiency !== undefined)
            motor.efficiency = efficiency;
        if (fuelType)
            motor.fuelType = fuelType;
        motor.manufacturer = manufacturer || motor.manufacturer;
        if (yearOfManufacture)
            motor.yearOfManufacture = yearOfManufacture;
        if (warranty !== undefined)
            motor.warranty = warranty;
        if (features && features.length > 0) {
            motor.features = features;
        }
        const updatedMotor = await motor.save();
        res.json(updatedMotor);
    }
    else {
        res.status(404);
        throw new Error('Мотор не найден');
    }
});
exports.createMotorReview = (0, express_async_handler_1.default)(async (req, res) => {
    const { rating, comment } = req.body;
    if (!req.user) {
        res.status(401);
        throw new Error('Не авторизован');
    }
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        const alreadyReviewed = motor.reviews.find((r) => { var _a; return r.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
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
        motor.reviews.push(review);
        motor.numReviews = motor.reviews.length;
        motor.rating =
            motor.reviews.reduce((acc, item) => item.rating + acc, 0) /
                motor.reviews.length;
        await motor.save();
        res.status(201).json({ message: 'Отзыв добавлен' });
    }
    else {
        res.status(404);
        throw new Error('Мотор не найден');
    }
});
exports.getTopMotors = (0, express_async_handler_1.default)(async (req, res) => {
    const motors = await Motor_1.default.find({}).sort({ rating: -1 }).limit(5);
    res.json(motors);
});
exports.getMotorsByCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const motors = await Motor_1.default.find({ category: req.params.category });
    if (motors && motors.length > 0) {
        res.json(motors);
    }
    else {
        res.status(404);
        throw new Error('Моторы в данной категории не найдены');
    }
});
exports.getMotorCategories = (0, express_async_handler_1.default)(async (req, res) => {
    const categories = await Motor_1.default.aggregate([
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
exports.getMotorBrands = (0, express_async_handler_1.default)(async (req, res) => {
    const brands = await Motor_1.default.aggregate([
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
exports.getMotorManufacturers = (0, express_async_handler_1.default)(async (req, res) => {
    const manufacturers = await Motor_1.default.aggregate([
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
//# sourceMappingURL=motorController.js.map