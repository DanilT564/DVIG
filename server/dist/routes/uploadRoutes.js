"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
const uploadFile = (req, res) => res.json({ message: 'Загрузка файла' });
router.post('/', authMiddleware_1.protect, authMiddleware_1.admin, uploadFile);
exports.default = router;
//# sourceMappingURL=uploadRoutes.js.map