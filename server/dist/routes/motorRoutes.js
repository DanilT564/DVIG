"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const motorController_1 = require("../controllers/motorController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(motorController_1.getMotors)
    .post(authMiddleware_1.protect, authMiddleware_1.admin, motorController_1.createMotor);
router.get('/top', motorController_1.getTopMotors);
router.get('/categories', motorController_1.getMotorCategories);
router.get('/brands', motorController_1.getMotorBrands);
router.get('/manufacturers', motorController_1.getMotorManufacturers);
router.get('/category/:category', motorController_1.getMotorsByCategory);
router.route('/:id')
    .get(motorController_1.getMotorById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, motorController_1.updateMotor)
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, motorController_1.deleteMotor);
router.route('/:id/reviews')
    .post(authMiddleware_1.protect, motorController_1.createMotorReview);
exports.default = router;
//# sourceMappingURL=motorRoutes.js.map