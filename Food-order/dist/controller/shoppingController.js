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
exports.restaurantById = exports.searchFoods = exports.getFoodsIn30mins = exports.getTopRestaurants = exports.getFoodAvailability = void 0;
const models_1 = require("../models");
const getFoodAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const vandor = yield models_1.Vandor.find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .sort([["rating", "descending"]])
            .populate("foods");
        if (vandor.length > 0) {
            return res.json(vandor);
        }
        return res.json({
            message: "Data not found",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.getFoodAvailability = getFoodAvailability;
const getTopRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const vandor = yield models_1.Vandor.find({
            pincode: pincode,
            serviceAvailable: true,
        })
            .sort([["rating", "descending"]])
            .populate("foods")
            .limit(10);
        if (vandor.length > 0) {
            return res.json(vandor);
        }
        return res.json({
            message: "Data not found",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.getTopRestaurants = getTopRestaurants;
const getFoodsIn30mins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const vandor = yield models_1.Vandor.find({
            pincode: pincode,
            serviceAvailable: true,
        }).populate({
            path: "foods",
            match: { readyTime: { $lte: 30 } },
        });
        if (vandor.length > 0) {
            let arr = [];
            vandor.map((vandor) => {
                arr.push(...vandor === null || vandor === void 0 ? void 0 : vandor.foods);
            });
            return res.json(arr);
        }
        return res.json({
            message: "Data not found",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.getFoodsIn30mins = getFoodsIn30mins;
const searchFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pincode = req.params.pincode;
        const vandor = yield models_1.Vandor.find({
            pincode: pincode,
        }).populate({
            path: "foods",
        });
        if (vandor.length > 0) {
            let arr = [];
            vandor.map((vandor) => {
                arr.push(...vandor === null || vandor === void 0 ? void 0 : vandor.foods);
            });
            return res.json(arr);
        }
        return res.json({
            message: "Data not found",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.searchFoods = searchFoods;
const restaurantById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const vandor = yield models_1.Vandor.findById(id).populate("foods");
        if (vandor) {
            return res.json(vandor);
        }
        return res.json({
            message: "Data not found",
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ Error: error, message: "vandor creation failed" });
    }
});
exports.restaurantById = restaurantById;
//# sourceMappingURL=shoppingController.js.map