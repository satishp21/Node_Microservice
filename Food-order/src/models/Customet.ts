import mongoose, { Schema } from "mongoose";
import { CreateCustomerInputs } from "../dto/customer.dto";
import { OrderDoc } from "./Order";

interface CustomerDoc extends CreateCustomerInputs {
  email: string;
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  phone: string;
  verified: boolean;
  otp: number;
  otp_expiry: Date;
  lat: number;
  lng: number;
  address: string;
  orders: [OrderDoc];
  cart: [any];
}

const customerSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    verified: Boolean,
    otp: Number,
    otp_expiry: Number,
    lat: Number,
    lng: Number,
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    cart: [
      {
        food: { type: Schema.Types.ObjectId, ref: "food" },
        unit: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.password;
        delete ret.salt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
  }
);

const Customer = mongoose.model<CustomerDoc>("customer", customerSchema);

export { Customer };
