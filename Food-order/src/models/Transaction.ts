import mongoose from "mongoose";
import { CreateFoodInput } from "../dto/Food.dto";

interface TransactionDoc extends Document {
  vandorId: string;
  orderId: string;
  customer: string;
  orderValue: number;
  offerUsed: string;
  status: string;
  paymentMode: string;
  paymentResponse: string;
}

const TransactionSchema = new mongoose.Schema(
  {
    vandorId: String,
    orderId: String,
    customer: String,
    orderValue: Number,
    offerUsed: String,
    status: String,
    paymentMode: String,
    rating: Number,
    paymentResponse: String,
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

const Transaction = mongoose.model<TransactionDoc>(
  "transaction",
  TransactionSchema
);

export { Transaction };
