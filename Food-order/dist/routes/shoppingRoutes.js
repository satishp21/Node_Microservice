"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = (0, express_1.default)();
exports.shoppingRoute = router;
//food availability
router.get("/:pincode", controller_1.getFoodAvailability);
// top resturent
router.get("/top-restaurants/:pincode", controller_1.getTopRestaurants);
// food available in 30 min
router.get("/foods-in-30-min/:pincode", controller_1.getFoodsIn30mins);
// search foods
router.get("/search/:pincode", controller_1.searchFoods);
// find restaurant by ID
router.get("/restaurant/:id", controller_1.restaurantById);
//# sourceMappingURL=shoppingRoutes.js.map