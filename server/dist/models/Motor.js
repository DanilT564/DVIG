"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const motorSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        default: 12,
    },
    features: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});
motorSchema.virtual('powerKW').get(function () {
    return this.power * 0.7457;
});
motorSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.rating = 0;
    }
    else {
        this.rating = Math.round((this.reviews.reduce((sum, review) => sum + review.rating, 0) /
            this.reviews.length) *
            10) / 10;
    }
    return this.rating;
};
const Motor = mongoose_1.default.model('Motor', motorSchema);
exports.default = Motor;
//# sourceMappingURL=Motor.js.map