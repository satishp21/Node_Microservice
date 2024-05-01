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
exports.editCustomerProfile = exports.getCustomerProfile = exports.requestOtp = exports.customerVerify = exports.customerSignin = exports.customerSignup = void 0;
const class_validator_1 = require("class-validator");
const http_status_codes_1 = require("http-status-codes");
const class_transformer_1 = require("class-transformer");
const customer_dto_1 = require("../dto/customer.dto");
const Customet_1 = require("../models/Customet");
const utility_1 = require("../utility");
const customerSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.CreateCustomerInputs, req.body);
    const inputErrors = yield (0, class_validator_1.validate)(customerInputs);
    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors);
    }
    const { email, phone, password } = customerInputs;
    const existingUser = yield Customet_1.Customer.findOne({ email });
    if (existingUser) {
        return res.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            statusCode: http_status_codes_1.StatusCodes.CONFLICT,
            message: "user already exists with mentioned mail",
        });
    }
    const hashedpass = yield (0, utility_1.genHash)(password);
    const { otp, expiry } = yield (0, utility_1.genOtp)();
    const result = yield Customet_1.Customer.create({
        email: email,
        password: hashedpass,
        otp: otp,
        phone: phone,
        otp_expiry: expiry,
        firstName: "",
        lastName: "",
        address: "",
        verified: false,
        lat: 0,
        lng: 0,
    });
    if (result) {
        yield (0, utility_1.onRequestOTP)(otp, phone);
        const token = yield (0, utility_1.genToken)({
            email: result === null || result === void 0 ? void 0 : result.email,
            id: String(result === null || result === void 0 ? void 0 : result._id),
            verified: result === null || result === void 0 ? void 0 : result.verified,
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            data: result,
            message: "customer created sucessfully",
            token: token,
            email: result === null || result === void 0 ? void 0 : result.email,
            id: String(result === null || result === void 0 ? void 0 : result._id),
            verified: result === null || result === void 0 ? void 0 : result.verified,
        });
    }
});
exports.customerSignup = customerSignup;
const customerSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const loginInputs = (0, class_transformer_1.plainToClass)(customer_dto_1.CustomerLoginInputs, { email, password });
    const loginErrors = yield (0, class_validator_1.validate)(loginInputs);
    if (loginErrors.length > 0) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ loginErrors });
    }
    const customer = yield Customet_1.Customer.findOne({ email });
    if (customer) {
        const check = yield (0, utility_1.passCheck)(password, customer.password);
        if (!check) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                message: "The password entered is incorrect. Please use the correct password.",
            });
        }
        const token = yield (0, utility_1.genToken)({
            email: customer.email,
            verified: customer.verified,
            id: String(customer._id),
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: "Customer signed in successfully",
            token,
            email: customer.email,
            id: String(customer._id),
            verified: customer.verified,
        });
    }
    return res
        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .json({ message: "Something went wrong" });
});
exports.customerSignin = customerSignin;
const customerVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp } = req.body;
    const user = res.locals.user;
    if (user) {
        const profile = yield Customet_1.Customer.findById(user.id);
        if (profile) {
            if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
                profile.verified = true;
                const updateProfile = yield profile.save();
                const token = yield (0, utility_1.genToken)({
                    email: updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.email,
                    id: String(updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile._id),
                    verified: updateProfile === null || updateProfile === void 0 ? void 0 : updateProfile.verified,
                });
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    message: "customer verified sucessfully",
                    token: token,
                    email: profile === null || profile === void 0 ? void 0 : profile.email,
                    verified: profile === null || profile === void 0 ? void 0 : profile.verified,
                });
            }
        }
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            message: "please provide valid OTP",
        });
    }
    return res
        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .json({ message: "User doesnt exist" });
});
exports.customerVerify = customerVerify;
const requestOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    if (user) {
        const profile = yield Customet_1.Customer.findById(user.id);
        if (profile) {
            const { otp, expiry } = yield (0, utility_1.genOtp)();
            profile.otp = otp;
            profile.otp_expiry = expiry;
            Promise.all([profile === null || profile === void 0 ? void 0 : profile.save(), (0, utility_1.onRequestOTP)(otp, profile === null || profile === void 0 ? void 0 : profile.phone)]);
            res
                .status(http_status_codes_1.StatusCodes.OK)
                .json({ message: "otp sent on your registered number" });
        }
    }
});
exports.requestOtp = requestOtp;
const getCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const profile = yield Customet_1.Customer.findById(user.id);
    if (profile) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ data: profile });
    }
    return res
        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .json({ message: "something went wrong" });
});
exports.getCustomerProfile = getCustomerProfile;
const editCustomerProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    const profile = yield Customet_1.Customer.findById(user.id);
    const { firstName, lastName, phone, address } = req.body;
    if (profile) {
        const error = yield (0, class_validator_1.validate)(customer_dto_1.EditCustomerInputs, req.body);
        if (error.length > 0) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
        }
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.phone = phone;
        profile.address = address;
        yield profile.save();
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ message: "profile updated successfully" });
    }
});
exports.editCustomerProfile = editCustomerProfile;
//# sourceMappingURL=customerController.js.map