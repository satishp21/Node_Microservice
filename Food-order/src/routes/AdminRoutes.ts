import express, { Request, Response, NextFunction } from "express";

import {
  VerifyDeliveryUser,
  GetDeliveryUsers,
  createVandor,
  getTransactionById,
  getTransactions,
  getVandor,
  getVandors,
} from "../controller";

const router = express();

router.get("/admin", (req, res) => {
  return res.status(200).json("this is response from admin");
});

router.get("/vandor/:id", getVandor);

router.post("/vandor", createVandor);

router.get("/vandors", getVandors);

router.get("/transactions", getTransactions);

router.get("/transaction/:id", getTransactionById);

router.put("/delivery/verify", VerifyDeliveryUser);
router.get("/delivery/users", GetDeliveryUsers);

export { router as adminRoutes };
