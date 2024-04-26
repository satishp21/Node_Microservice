import express, { Request, Response, NextFunction } from "express";
import { createVandorInput } from "../dto";

import { Vandor } from "../models";
import { genHash } from "../utility/passUtility";

export const createVandor = async (req: Request, res: Response) => {
  try {
    const vandor = await Vandor.findOne({ email: req.body.email });

    if (vandor) {
      return res.json({ message: "email already in use" });
    }

    const { name, ownerName, address, pincode, password, email, foodType } = <
      createVandorInput
    >req.body;

    const hashedpass = await genHash(password);

    const createVandor = await Vandor.create({
      name,
      ownerName,
      address,
      pincode,
      password: hashedpass,
      email,
    });
    return res.json({
      data: createVandor,
      message: "vandor created succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};

export const getVandors = async (req: Request, res: Response) => {
  try {
    const vandors = await Vandor.find().populate("food").exec();
    return res.json({ data: vandors, message: "vandors fetched" });
  } catch (error) {
    console.log(error);

    return res.json({ Error: error, message: "vandors fetching failed" });
  }
};

export const getVandor = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const vandors = await Vandor.findById(_id);
    return res.json({ data: vandors, message: "vandor fetched succesfully" });
  } catch (error) {
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};
