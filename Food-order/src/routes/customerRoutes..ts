import express, { Request, Response, NextFunction } from "express";
import {
  addToCart,
  createOrder,
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

router.post("/create-order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:id", getOrderById);

export { router as customerRoute };
