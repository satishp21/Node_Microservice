"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vandorController_1 = require("../controller/vandorController");
const authenticate_1 = require("../middleware/authenticate");
const router = (0, express_1.default)();
exports.VandorRoutes = router;
router.post("/login", vandorController_1.vandorLogin);
router.use(authenticate_1.authenticate);
router.get("/profile", vandorController_1.getVandorProfile);
router.patch("/profile", vandorController_1.updateVandorProfile);
router.patch("/service", vandorController_1.updateVandorService);
router.post("/addfood", vandorController_1.addFood);
router.get("/foods", vandorController_1.getFoods);
//# sourceMappingURL=VandorRoute.js.map