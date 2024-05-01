"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRequestOTP = exports.genOtp = void 0;
const genOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(10000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
});
exports.genOtp = genOtp;
const onRequestOTP = (otp, toPhonenNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountSid = "AC4f16a39c633856c7d42bcb367e9ae142";
        const authToken = "8ed5c5188c2335e61a48b53b22e9fdbb";
        const client = require("twilio")(accountSid, authToken);
        const response = yield client.messages.create({
            body: `Your OTP is ${otp}`,
            from: "+13148885018",
            to: `+91${toPhonenNumber}`,
        });
        return response;
    }
    catch (err) {
        return err;
    }
});
exports.onRequestOTP = onRequestOTP;
//# sourceMappingURL=notificationUtility.js.map