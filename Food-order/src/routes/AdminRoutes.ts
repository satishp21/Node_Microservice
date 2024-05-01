import express, { Request, Response, NextFunction } from "express";

import { createVandor, getVandor, getVandors } from "../controller";

const router = express();

router.get("/admin", (req, res) => {
  return res.status(200).json("this is response from admin");
});

router.get("/vandor/:id", getVandor);

router.post("/vandor", createVandor);

router.get("/vandors", getVandors);

export { router as adminRoutes };
