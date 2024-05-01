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
exports.getFoods = exports.addFood = exports.updateVandorService = exports.updateVandorProfile = exports.getVandorProfile = exports.vandorLogin = void 0;
const models_1 = require("../models");
const passUtility_1 = require("../utility/passUtility");
const vandorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const vandor = yield models_1.Vandor.findOne({ email });
    if (!vandor) {
        return res.json({ message: "the user with mentioned mail doesnt exist" });
    }
    const authenticate = yield (0, passUtility_1.passCheck)(password, vandor.password);
    if (!authenticate) {
        return res.json({ message: "please use correct password" });
    }
    const token = yield (0, passUtility_1.genToken)({ email: vandor.email, id: vandor._id });
    return res.json({ message: "successfully logged in", token: token });
});
exports.vandorLogin = vandorLogin;
const getVandorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = (_a = res === null || res === void 0 ? void 0 : res.locals) === null || _a === void 0 ? void 0 : _a.user;
    const vandor = yield models_1.Vandor.findOne({ email: user.email });
    return res.json({
        data: vandor,
        message: "successfully fetched vandor profile",
    });
});
exports.getVandorProfile = getVandorProfile;
const updateVandorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = (_b = res === null || res === void 0 ? void 0 : res.locals) === null || _b === void 0 ? void 0 : _b.user;
    const { name, address, phone } = req.body;
    if (user) {
        const vandor = yield models_1.Vandor.findOne({ email: user.email });
        if (vandor) {
            (vandor.name = name), (vandor.address = address), (vandor.phone = phone);
            const savedResult = yield (vandor === null || vandor === void 0 ? void 0 : vandor.save());
            return res.json(savedResult);
        }
    }
    return res.json({ message: "vandor information not found" });
});
exports.updateVandorProfile = updateVandorProfile;
const updateVandorService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const user = (_c = res === null || res === void 0 ? void 0 : res.locals) === null || _c === void 0 ? void 0 : _c.user;
    if (user) {
        const vandor = yield models_1.Vandor.findOne({ email: user.email });
        if (vandor) {
            vandor.serviceAvailable = !vandor.serviceAvailable;
            const savedResult = yield (vandor === null || vandor === void 0 ? void 0 : vandor.save());
            return res.json(savedResult);
        }
    }
    return res.json({ message: "vandor information not found" });
});
exports.updateVandorService = updateVandorService;
const addFood = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const user = (_d = res === null || res === void 0 ? void 0 : res.locals) === null || _d === void 0 ? void 0 : _d.user;
    if (user) {
        const vandor = yield models_1.Vandor.findOne({ email: user.email });
        if (vandor) {
            // const {name , description, price, category, foodType, readyTime} = <CreateFoodInput>req.body
            console.log(user._id, "this is your vandor id");
            const food = yield models_1.Food.create(Object.assign(Object.assign({}, req.body), { vandorId: user === null || user === void 0 ? void 0 : user.id }));
            vandor.foods.push(food);
            const result = yield vandor.save();
            return res.json({ data: result, message: "food created succesfully" });
        }
    }
    return res.json({ message: "vandor information not found" });
});
exports.addFood = addFood;
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const user = (_e = res === null || res === void 0 ? void 0 : res.locals) === null || _e === void 0 ? void 0 : _e.user;
    if (user) {
        const foods = yield models_1.Food.find();
        if (foods) {
            return res.json(foods);
        }
        return res.json({ message: "no food found for the vandor" });
    }
    return res.json({ message: "vandor information not found" });
});
exports.getFoods = getFoods;
//# sourceMappingURL=vandorController.js.map