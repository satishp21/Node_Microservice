import mongoose, { Schema } from "mongoose";

export interface OrderDoc extends Document {
  orderId: string;
  items: [any];
  totalAmount: number;
  orderDate: Date;
  paidThrough: string;
  paymentResponse: string;
  orderStatus: string;
}

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food", required: true },
        unit: Number,
      },
    ],
    totalAmount: Number,
    orderDate: Date,
    paidThrough: String,
    paymentResponse: String,
    orderStatus: String,
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

const Order = mongoose.model<OrderDoc>("order", OrderSchema);

export { Order };
