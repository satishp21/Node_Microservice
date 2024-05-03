import mongoose, { Schema } from "mongoose";

export interface OrderDoc extends Document {
  orderId: string;
  vandorId: string;
  items: [any];
  totalAmount: number;
  paidAmount: number;
  orderDate: Date;
  orderStatus: string;
  remarks: string;
  deliveryId: string;
  readyTime: number;
}

const OrderSchema = new mongoose.Schema(
  {
    orderId: String,
    vandorId: String,
    items: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food", required: true },
        unit: Number,
      },
    ],
    totalAmount: Number,
    paidAmount: Number,
    orderDate: Date,
    orderStatus: String,
    remarks: String,
    deliveryId: String,
    readyTime: Number,
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
