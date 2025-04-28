"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const login = (req, res) => res.json({ message: 'Вход в систему' });
const register = (req, res) => res.json({ message: 'Регистрация пользователя' });
const refreshToken = (req, res) => res.json({ message: 'Обновление токена' });
const logout = (req, res) => res.json({ message: 'Выход из системы' });
router.post('/login', login);
router.post('/register', register);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map