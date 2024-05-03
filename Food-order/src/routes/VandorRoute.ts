import express from "express";
import {
  addFood,
  addOffer,
  editOffer,
  getCurrentOrder,
  getFoods,
  getOffers,
  getOrderDetails,
  getVandorProfile,
  processOrder,
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

//orders

router.get("/orders", getCurrentOrder);
router.put("/order/:id/process", processOrder);
router.get("/order/:id", getOrderDetails);

//offers

router.get("/offers", getOffers);
router.post("/offers", addOffer);
router.put("/offers/:id", editOffer);

export { router as VandorRoutes };
