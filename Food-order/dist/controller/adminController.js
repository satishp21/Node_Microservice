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
exports.getVandor = exports.getVandors = exports.createVandor = void 0;
const models_1 = require("../models");
const passUtility_1 = require("../utility/passUtility");
const createVandor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vandor = yield models_1.Vandor.findOne({ email: req.body.email });
        if (vandor) {
            return res.json({ message: "email already in use" });
        }
        const { name, ownerName, address, pincode, password, email, foodType } = req.body;
        const hashedpass = yield (0, passUtility_1.genHash)(password);
        const createVandor = yield models_1.Vandor.create({
            name,
            ownerName,
            address,
            pincode,
            password: hashedpass,
            email,
        });
        return res.json({
            data: createVandor,
            message: "vandor created succesfully",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.createVandor = createVandor;
const getVandors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vandors = yield models_1.Vandor.find().populate("food").exec();
        return res.json({ data: vandors, message: "vandors fetched" });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandors fetching failed" });
    }
});
exports.getVandors = getVandors;
const getVandor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const vandors = yield models_1.Vandor.findById(_id);
        return res.json({ data: vandors, message: "vandor fetched succesfully" });
    }
    catch (error) {
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.getVandor = getVandor;
//# sourceMappingURL=adminController.js.map