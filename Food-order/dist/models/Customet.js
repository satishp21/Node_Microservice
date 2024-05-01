"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customerSchema = new mongoose_1.default.Schema({
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
}, {
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
});
const Customer = mongoose_1.default.model("customer", customerSchema);
exports.Customer = Customer;
//# sourceMappingURL=Customet.js.map