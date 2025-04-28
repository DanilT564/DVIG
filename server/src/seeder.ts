import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users';
import motors from './data/motors';
import User from './models/User';
import Motor from './models/Motor';
import connectDB from './config/db';

dotenv.config();
colors.enable();

connectDB();

const importData = async () => {
  try {
    // Очистка базы данных
    await Motor.deleteMany({});
    await User.deleteMany({});

    // Импорт пользователей
    const createdUsers = await User.insertMany(users);

    // Получаем ID админа для привязки моторов
    const adminUser = createdUsers[0]._id;

    // Привязываем админа к каждому мотору
    const sampleMotors = motors.map((motor) => {
      return { ...motor, user: adminUser };
    });

    // Импорт моторов
    await Motor.insertMany(sampleMotors);

    console.log('Данные импортированы!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Очистка базы данных
    await Motor.deleteMany({});
    await User.deleteMany({});

    console.log('Данные удалены!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Проверяем аргументы командной строки
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 