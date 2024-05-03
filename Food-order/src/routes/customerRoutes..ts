import express, { Request, Response, NextFunction } from "express";
import {
  addToCart,
  createOrder,
  createPayment,
  customerSignin,
  customerSignup,
  customerVerify,
  deleteCart,
  editCustomerProfile,
  getCart,
  getCustomerProfile,
  getOrderById,
  getOrders,
  requestOtp,
  verifyOffer,
} from "../controller";
import { authenticate } from "../middleware/authenticate";

const router = express();

router.post("/signup", customerSignup);

router.post("/login", customerSignin);

router.use(authenticate);

router.patch("/verify", customerVerify);

router.get("/otp", requestOtp);

router.get("/profile", getCustomerProfile);

router.patch("/profile", editCustomerProfile);

//Cart

router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart", deleteCart);

//apply offer
router.get("/offer/verify/:id", verifyOffer);

//payment

router.post("/create-payment", createPayment);

router.post("/create-order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrderById);

export { router as customerRoute };
