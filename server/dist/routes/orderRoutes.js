"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const getOrders = (req, res) => res.json({ message: 'Получение всех заказов' });
const getMyOrders = (req, res) => res.json({ message: 'Получение моих заказов' });
const getOrderById = (req, res) => res.json({ message: 'Получение заказа по ID' });
const createOrder = (req, res) => res.json({ message: 'Создание заказа' });
const updateOrderToPaid = (req, res) => res.json({ message: 'Обновление статуса оплаты заказа' });
const updateOrderToDelivered = (req, res) => res.json({ message: 'Обновление статуса доставки заказа' });
router.route('/')
    .post(authMiddleware_1.protect, createOrder)
    .get(authMiddleware_1.protect, authMiddleware_1.admin, getOrders);
router.route('/myorders').get(authMiddleware_1.protect, getMyOrders);
router.route('/:id').get(authMiddleware_1.protect, getOrderById);
router.route('/:id/pay').put(authMiddleware_1.protect, updateOrderToPaid);
router.route('/:id/deliver').put(authMiddleware_1.protect, authMiddleware_1.admin, updateOrderToDelivered);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map