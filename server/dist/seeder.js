"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const users_1 = __importDefault(require("./data/users"));
const motors_1 = __importDefault(require("./data/motors"));
const User_1 = __importDefault(require("./models/User"));
const Motor_1 = __importDefault(require("./models/Motor"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
colors_1.default.enable();
(0, db_1.default)();
const importData = async () => {
    try {
        await Motor_1.default.deleteMany({});
        await User_1.default.deleteMany({});
        const createdUsers = await User_1.default.insertMany(users_1.default);
        const adminUser = createdUsers[0]._id;
        const sampleMotors = motors_1.default.map((motor) => {
            return { ...motor, user: adminUser };
        });
        await Motor_1.default.insertMany(sampleMotors);
        console.log('Данные импортированы!'.green.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await Motor_1.default.deleteMany({});
        await User_1.default.deleteMany({});
        console.log('Данные удалены!'.red.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
//# sourceMappingURL=seeder.js.map