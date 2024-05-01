import express, { Request, Response, NextFunction } from "express";
import { createVandorInput } from "../dto";

import { Vandor } from "../models";

export const getFoodAvailability = async (req: Request, res: Response) => {
  try {
    const pincode = req.params.pincode;
    const vandor = await Vandor.find({
      pincode: pincode,
      serviceAvailable: true,
    })
      .sort([["rating", "descending"]])
      .populate("foods");

    if (vandor.length > 0) {
      return res.json(vandor);
    }

    return res.json({
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};

export const getTopRestaurants = async (req: Request, res: Response) => {
  try {
    const pincode = req.params.pincode;
    const vandor = await Vandor.find({
      pincode: pincode,
      serviceAvailable: true,
    })
      .sort([["rating", "descending"]])
      .populate("foods")
      .limit(10);

    if (vandor.length > 0) {
      return res.json(vandor);
    }

    return res.json({
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};

export const getFoodsIn30mins = async (req: Request, res: Response) => {
  try {
    const pincode = req.params.pincode;
    const vandor = await Vandor.find({
      pincode: pincode,
      serviceAvailable: true,
    }).populate({
      path: "foods",
      match: { readyTime: { $lte: 30 } },
    });

    if (vandor.length > 0) {
      let arr: any = [];
      vandor.map((vandor) => {
        arr.push(...vandor?.foods);
      });
      return res.json(arr);
    }

    return res.json({
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};

export const searchFoods = async (req: Request, res: Response) => {
  try {
    const pincode = req.params.pincode;
    const vandor = await Vandor.find({
      pincode: pincode,
    }).populate({
      path: "foods",
    });

    if (vandor.length > 0) {
      let arr: any = [];
      vandor.map((vandor) => {
        arr.push(...vandor?.foods);
      });
      return res.json(arr);
    }

    return res.json({
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};

export const restaurantById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const vandor = await Vandor.findById(id).populate("foods");

    if (vandor) {
      return res.json(vandor);
    }

    return res.json({
      message: "Data not found",
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error, message: "vandor creation failed" });
  }
};
