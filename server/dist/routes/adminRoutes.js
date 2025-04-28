"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const getDashboardStats = (req, res) => res.json({ message: 'Получение статистики для дашборда' });
const getOrderStats = (req, res) => res.json({ message: 'Получение статистики заказов' });
const getUserStats = (req, res) => res.json({ message: 'Получение статистики пользователей' });
const getProductStats = (req, res) => res.json({ message: 'Получение статистики продуктов' });
router.use(authMiddleware_1.protect);
router.use(authMiddleware_1.admin);
router.get('/dashboard', getDashboardStats);
router.get('/stats/orders', getOrderStats);
router.get('/stats/users', getUserStats);
router.get('/stats/products', getProductStats);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map