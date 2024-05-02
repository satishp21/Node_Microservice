"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoute = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.default)();
exports.customerRoute = router;
router.post("/signup", controller_1.customerSignup);
router.post("/login", controller_1.customerSignin);
router.use(authenticate_1.authenticate);
router.patch("/verify", controller_1.customerVerify);
router.get("/otp", controller_1.requestOtp);
router.get("/profile", controller_1.getCustomerProfile);
router.patch("/profile", controller_1.editCustomerProfile);
router.post("/create-order", controller_1.createOrder);
router.get("orders", controller_1.getOrders);
router.get("/order/:id", controller_1.getOrderById);
//# sourceMappingURL=customerRoutes..js.map