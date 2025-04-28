"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.registerUser = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.authUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    res.json({
        message: 'Пользователь аутентифицирован',
        email
    });
});
exports.registerUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    res.json({
        message: 'Пользователь зарегистрирован',
        name,
        email
    });
});
exports.getUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    res.json({
        message: 'Профиль пользователя получен',
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    });
});
exports.updateUserProfile = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    res.json({
        message: 'Профиль пользователя обновлен',
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
    });
});
exports.getUsers = (0, express_async_handler_1.default)(async (req, res) => {
    res.json({
        message: 'Список всех пользователей получен'
    });
});
exports.deleteUser = (0, express_async_handler_1.default)(async (req, res) => {
    res.json({
        message: 'Пользователь удален',
        userId: req.params.id
    });
});
exports.getUserById = (0, express_async_handler_1.default)(async (req, res) => {
    res.json({
        message: 'Пользователь получен по ID',
        userId: req.params.id
    });
});
exports.updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    res.json({
        message: 'Пользователь обновлен',
        userId: req.params.id
    });
});
//# sourceMappingURL=userController.js.map