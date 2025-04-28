"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMotorManufacturers = exports.getMotorBrands = exports.getMotorCategories = exports.getMotorsByBrand = exports.getMotorsByCategory = exports.getTopMotors = exports.createMotorReview = exports.updateMotor = exports.createMotor = exports.deleteMotor = exports.getMotorById = exports.getMotors = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Motor_1 = __importDefault(require("../models/Motor"));
const getMotors = (0, express_async_handler_1.default)(async (req, res) => {
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
        const sortField = req.query.sortBy;
        const sortOrder = req.query.order === 'desc' ? -1 : 1;
        sort[sortField] = sortOrder;
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
        total: count,
    });
});
exports.getMotors = getMotors;
const getMotorById = (0, express_async_handler_1.default)(async (req, res) => {
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        res.json(motor);
    }
    else {
        res.status(404);
        throw new Error('Motor not found');
    }
});
exports.getMotorById = getMotorById;
const deleteMotor = (0, express_async_handler_1.default)(async (req, res) => {
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        await motor.deleteOne();
        res.json({ message: 'Motor removed' });
    }
    else {
        res.status(404);
        throw new Error('Motor not found');
    }
});
exports.deleteMotor = deleteMotor;
const createMotor = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const motor = new Motor_1.default({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
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
exports.createMotor = createMotor;
const updateMotor = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, price, description, image, images, brand, category, countInStock, power, weight, dimensions, voltage, rpm, efficiency, fuelType, manufacturer, yearOfManufacture, warranty, features, } = req.body;
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        motor.name = name || motor.name;
        motor.price = price !== undefined ? price : motor.price;
        motor.description = description || motor.description;
        motor.image = image || motor.image;
        if (images)
            motor.images = images;
        motor.brand = brand || motor.brand;
        motor.category = category || motor.category;
        motor.countInStock = countInStock !== undefined ? countInStock : motor.countInStock;
        motor.power = power !== undefined ? power : motor.power;
        if (weight !== undefined)
            motor.weight = weight;
        if (dimensions)
            motor.dimensions = dimensions;
        if (voltage !== undefined)
            motor.voltage = voltage;
        if (rpm !== undefined)
            motor.rpm = rpm;
        if (efficiency !== undefined)
            motor.efficiency = efficiency;
        if (fuelType)
            motor.fuelType = fuelType;
        motor.manufacturer = manufacturer || motor.manufacturer;
        if (yearOfManufacture !== undefined)
            motor.yearOfManufacture = yearOfManufacture;
        if (warranty !== undefined)
            motor.warranty = warranty;
        if (features)
            motor.features = features;
        const updatedMotor = await motor.save();
        res.json(updatedMotor);
    }
    else {
        res.status(404);
        throw new Error('Motor not found');
    }
});
exports.updateMotor = updateMotor;
const createMotorReview = (0, express_async_handler_1.default)(async (req, res) => {
    var _a, _b;
    const { rating, comment } = req.body;
    const motor = await Motor_1.default.findById(req.params.id);
    if (motor) {
        const alreadyReviewed = motor.reviews.find((r) => { var _a; return r.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString()); });
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Motor already reviewed');
        }
        const review = {
            name: ((_a = req.user) === null || _a === void 0 ? void 0 : _a.name) || 'Anonymous',
            rating: Number(rating),
            comment,
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
        };
        motor.reviews.push(review);
        motor.numReviews = motor.reviews.length;
        motor.rating =
            motor.reviews.reduce((acc, item) => acc + item.rating, 0) /
                motor.reviews.length;
        await motor.save();
        res.status(201).json({ message: 'Review added' });
    }
    else {
        res.status(404);
        throw new Error('Motor not found');
    }
});
exports.createMotorReview = createMotorReview;
const getTopMotors = (0, express_async_handler_1.default)(async (req, res) => {
    const motors = await Motor_1.default.find({}).sort({ rating: -1 }).limit(5);
    res.json(motors);
});
exports.getTopMotors = getTopMotors;
const getMotorsByCategory = (0, express_async_handler_1.default)(async (req, res) => {
    const category = req.params.category;
    const motors = await Motor_1.default.find({ category });
    if (motors && motors.length > 0) {
        res.json(motors);
    }
    else {
        res.status(404);
        throw new Error(`No motors found in category ${category}`);
    }
});
exports.getMotorsByCategory = getMotorsByCategory;
const getMotorsByBrand = (0, express_async_handler_1.default)(async (req, res) => {
    const brand = req.params.brand;
    const motors = await Motor_1.default.find({ brand });
    if (motors && motors.length > 0) {
        res.json(motors);
    }
    else {
        res.status(404);
        throw new Error(`No motors found for brand ${brand}`);
    }
});
exports.getMotorsByBrand = getMotorsByBrand;
const getMotorCategories = (0, express_async_handler_1.default)(async (req, res) => {
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
exports.getMotorCategories = getMotorCategories;
const getMotorBrands = (0, express_async_handler_1.default)(async (req, res) => {
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
exports.getMotorBrands = getMotorBrands;
const getMotorManufacturers = (0, express_async_handler_1.default)(async (req, res) => {
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
exports.getMotorManufacturers = getMotorManufacturers;
//# sourceMappingURL=motorController.js.map