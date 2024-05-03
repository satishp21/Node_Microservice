"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = (0, express_1.default)();
exports.adminRoutes = router;
router.get("/admin", (req, res) => {
    return res.status(200).json("this is response from admin");
});
router.get("/vandor/:id", controller_1.getVandor);
router.post("/vandor", controller_1.createVandor);
router.get("/vandors", controller_1.getVandors);
//# sourceMappingURL=AdminRoutes.js.map