"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/login', userController_1.authUser);
router.post('/register', userController_1.registerUser);
router.route('/profile')
    .get(authMiddleware_1.protect, userController_1.getUserProfile)
    .put(authMiddleware_1.protect, userController_1.updateUserProfile);
router.route('/')
    .get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUsers);
router.route('/:id')
    .delete(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.deleteUser)
    .get(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.getUserById)
    .put(authMiddleware_1.protect, authMiddleware_1.admin, userController_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map