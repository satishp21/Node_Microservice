import express, { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { vandorPayload } from "../dto";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    const user = jsonwebtoken.verify(
      token!.split(" ")[1],
      "seckey"
    ) as vandorPayload;
    if (!user) {
      return res.json({ message: "unauthorized access" });
    }
    res.locals.user = user;
    next();
  } catch (error) {
    return res.json({
      message: "something went wrong please try login again",
      error: error,
    });
  }
};
