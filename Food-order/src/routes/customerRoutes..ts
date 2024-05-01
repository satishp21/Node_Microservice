import express, { Request, Response, NextFunction } from "express";
import {
  customerSignin,
  customerSignup,
  customerVerify,
  editCustomerProfile,
  getCustomerProfile,
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

export { router as customerRoute };
