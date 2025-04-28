"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.getOrders = exports.getMyOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.createOrder = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Order_1 = __importDefault(require("../models/Order"));
const Motor_1 = __importDefault(require("../models/Motor"));
const createOrder = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Заказ не содержит товаров');
    }
    const order = new Order_1.default({
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        status: 'pending',
    });
    const orderCount = await Order_1.default.countDocuments();
    order.orderNumber = String(orderCount + 1).padStart(6, '0');
    for (const item of orderItems) {
        const motor = await Motor_1.default.findById(item.product);
        if (motor) {
            motor.countInStock -= item.quantity;
            await motor.save();
        }
    }
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});
exports.createOrder = createOrder;
const getOrderById = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id).populate('user', 'name email');
    if (order) {
        if (!req.user) {
            res.status(401);
            throw new Error('Не авторизован');
        }
        if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
            res.json(order);
        }
        else {
            res.status(403);
            throw new Error('Доступ запрещен');
        }
    }
    else {
        res.status(404);
        throw new Error('Заказ не найден');
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
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
    }
    else {
        res.status(404);
        throw new Error('Заказ не найден');
    }
});
exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderToDelivered = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = new Date();
        order.status = 'delivered';
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Заказ не найден');
    }
});
exports.updateOrderToDelivered = updateOrderToDelivered;
const getMyOrders = (0, express_async_handler_1.default)(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Не авторизован');
    }
    const orders = await Order_1.default.find({ user: req.user._id });
    res.json(orders);
});
exports.getMyOrders = getMyOrders;
const getOrders = (0, express_async_handler_1.default)(async (req, res) => {
    const orders = await Order_1.default.find({}).populate('user', 'id name');
    res.json(orders);
});
exports.getOrders = getOrders;
const updateOrderStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { status } = req.body;
    const order = await Order_1.default.findById(req.params.id);
    if (order) {
        order.status = status;
        if (status === 'delivered') {
            order.isDelivered = true;
            order.deliveredAt = new Date();
        }
        if (status === 'cancelled' && !order.isRefunded) {
            for (const item of order.orderItems) {
                const motor = await Motor_1.default.findById(item.product);
                if (motor) {
                    motor.countInStock += item.quantity;
                    await motor.save();
                }
            }
            order.isRefunded = true;
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }
    else {
        res.status(404);
        throw new Error('Заказ не найден');
    }
});
exports.updateOrderStatus = updateOrderStatus;
const deleteOrder = (0, express_async_handler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id);
    if (order) {
        if (order.isPaid && !order.isRefunded) {
            for (const item of order.orderItems) {
                const motor = await Motor_1.default.findById(item.product);
                if (motor) {
                    motor.countInStock += item.quantity;
                    await motor.save();
                }
            }
        }
        await order.deleteOne();
        res.json({ message: 'Заказ удален' });
    }
    else {
        res.status(404);
        throw new Error('Заказ не найден');
    }
});
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=orderController.js.map