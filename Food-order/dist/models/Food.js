"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FoodSchema = new mongoose_1.default.Schema({
    vandorId: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    foodType: [String],
    readyTime: Number,
    rating: Number,
    images: [String],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
            delete ret.__v;
        },
    },
});
const Food = mongoose_1.default.model("food", FoodSchema);
exports.Food = Food;
//# sourceMappingURL=Food.js.map