"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        role: 'admin',
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        role: 'user',
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcryptjs_1.default.hashSync('123456', 10),
        role: 'user',
    },
];
exports.default = users;
//# sourceMappingURL=users.js.map