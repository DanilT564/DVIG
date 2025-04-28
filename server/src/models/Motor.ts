import mongoose from 'mongoose';

interface ReviewInterface {
  name: string;
  rating: number;
  comment: string;
  user: mongoose.Schema.Types.ObjectId;
}

interface Dimensions {
  length: number;
  width: number;
  height: number;
}

interface MotorInterface extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  image: string;
  images: string[];
  brand: string;
  category: string;
  description: string;
  reviews: ReviewInterface[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  power: number; // Мощность в лошадиных силах
  weight: number; // Вес в кг
  dimensions: Dimensions; // Размеры в мм
  voltage: number; // Напряжение в вольтах (для электродвигателей)
  rpm: number; // Обороты в минуту
  efficiency: number; // КПД в процентах
  fuelType?: string; // Тип топлива (для двигателей внутреннего сгорания)
  manufacturer: string; // Производитель
  yearOfManufacture: number; // Год выпуска
  warranty: number; // Гарантия в месяцах
  features: string[]; // Особенности и преимущества
}

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const motorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['electric', 'diesel', 'gasoline', 'hydraulic', 'pneumatic', 'other'],
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    power: {
      type: Number,
      required: true,
      default: 0,
    },
    weight: {
      type: Number,
      required: false,
      default: 0,
    },
    dimensions: {
      length: {
        type: Number,
        required: false,
        default: 0,
      },
      width: {
        type: Number,
        required: false,
        default: 0,
      },
      height: {
        type: Number,
        required: false,
        default: 0,
      },
    },
    voltage: {
      type: Number,
      required: false,
    },
    rpm: {
      type: Number,
      required: false,
    },
    efficiency: {
      type: Number,
      required: false,
      min: 0,
      max: 100,
    },
    fuelType: {
      type: String,
      required: false,
      enum: ['diesel', 'gasoline', 'natural_gas', 'lpg', 'not_applicable'],
    },
    manufacturer: {
      type: String,
      required: true,
    },
    yearOfManufacture: {
      type: Number,
      required: false,
      default: new Date().getFullYear(),
    },
    warranty: {
      type: Number,
      required: false,
      default: 12, // 12 месяцев
    },
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Виртуальное свойство для вычисления мощности в киловаттах
motorSchema.virtual('powerKW').get(function() {
  return this.power * 0.7457; // Перевод из л.с. в кВт
});

// Метод для расчёта средней оценки на основе отзывов
motorSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
  } else {
    this.rating = Math.round(
      (this.reviews.reduce((sum: number, review: ReviewInterface) => sum + review.rating, 0) /
        this.reviews.length) *
        10
    ) / 10;
  }
  return this.rating;
};

const Motor = mongoose.model<MotorInterface>('Motor', motorSchema);

export default Motor; 