import express from "express";
import {
  addFood,
  getFoods,
  getVandorProfile,
  updateVandorProfile,
  updateVandorService,
  vandorLogin,
} from "../controller/vandorController";
import { authenticate } from "../middleware/authenticate";

const router = express();

router.post("/login", vandorLogin);

router.use(authenticate);
router.get("/profile", getVandorProfile);
router.patch("/profile", updateVandorProfile);
router.patch("/service", updateVandorService);

router.post("/addfood", addFood);
router.get("/foods", getFoods);

export { router as VandorRoutes };
