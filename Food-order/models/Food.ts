import mongoose from "mongoose";
import { CreateFoodInput } from "../dto/Food.dto";

interface FoodDoc extends CreateFoodInput {
  vandorId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  foodType: [string];
  readyTime: number;
  rating: string;
  images: [string];
}

const FoodSchema = new mongoose.Schema(
  {
    vandorId: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    foodType: [String],
    readyTime: Number,
    rating: Number,
    images: [String],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

const Food = mongoose.model<FoodDoc>("food", FoodSchema);

export { Food };
