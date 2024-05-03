export interface createVandorInput {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
}

export interface vandorLoginInput {
  email: string;
  password: string;
}

export interface vandorPayload {
  email: string;
  id: string;
}

export interface EditVandorInput {
  name: string;
  address: string;
  phone: string;
}

export interface addOfferInput {
  offerType: string;
  vandors: [any];
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
