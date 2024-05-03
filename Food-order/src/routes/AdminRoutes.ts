import express, { Request, Response, NextFunction } from "express";

import {
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

export { router as adminRoutes };
