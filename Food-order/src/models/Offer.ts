import mongoose, { Schema } from "mongoose";

export interface OfferDoc extends Document {
  offerType: string;
  vandor: [any];
  title: string;
  description: string;
  minValue: number;
  offerAmount: number;
  startValidity: Date;
  endValidity: Date;
  promoCode: string;
  promoType: string;
  bank: [any];
  bins: [any];
  pincode: string;
  isActive: boolean;
}

const OfferSchema = new mongoose.Schema(
  {
    offerType: String,
    vandor: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vandor",
      },
    ],
    title: String,
    description: String,
    minValue: Number,
    offerAmount: Number,
    startValidity: Date,
    endValidity: Date,
    promoCode: String,
    promoType: String,
    bank: [String],
    bins: [String],
    pincode: String,
    isActive: Boolean,
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

const Offer = mongoose.model<OfferDoc>("offer", OfferSchema);

export { Offer };
