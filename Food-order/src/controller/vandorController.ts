import express, { Request, Response, NextFunction } from "express";
import { Food, Vandor } from "../models";
import { genToken, passCheck } from "../utility/passUtility";
import { EditVandorInput, vandorLoginInput } from "../dto";
import { CreateFoodInput } from "../dto/Food.dto";

export const vandorLogin = async (req: Request, res: Response) => {
  const { email, password } = <vandorLoginInput>req.body;
  const vandor = await Vandor.findOne({ email });

  if (!vandor) {
    return res.json({ message: "the user with mentioned mail doesnt exist" });
  }
  const authenticate = await passCheck(password, vandor.password);

  if (!authenticate) {
    return res.json({ message: "please use correct password" });
  }
  const token = await genToken({ email: vandor.email, id: vandor._id });

  return res.json({ message: "successfully logged in", token: token });
};

export const getVandorProfile = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  const vandor = await Vandor.findOne({ email: user.email });

  return res.json({
    data: vandor,
    message: "successfully fetched vandor profile",
  });
};

export const updateVandorProfile = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  const { name, address, phone } = <EditVandorInput>req.body;

  if (user) {
    const vandor = await Vandor.findOne({ email: user.email });
    if (vandor) {
      (vandor.name = name), (vandor.address = address), (vandor.phone = phone);
      const savedResult = await vandor?.save();
      return res.json(savedResult);
    }
  }

  return res.json({ message: "vandor information not found" });
};

export const updateVandorService = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  if (user) {
    const vandor = await Vandor.findOne({ email: user.email });
    if (vandor) {
      vandor.serviceAvailable = !vandor.serviceAvailable;
      const savedResult = await vandor?.save();
      return res.json(savedResult);
    }
  }

  return res.json({ message: "vandor information not found" });
};

export const addFood = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  if (user) {
    const vandor = await Vandor.findOne({ email: user.email });
    if (vandor) {
      // const {name , description, price, category, foodType, readyTime} = <CreateFoodInput>req.body

      console.log(user._id, "this is your vandor id");

      const food = await Food.create<CreateFoodInput>({
        ...req.body,
        vandorId: user?.id,
      });

      vandor.foods.push(food);
      const result = await vandor.save();

      return res.json({ data: result, message: "food created succesfully" });
    }
  }

  return res.json({ message: "vandor information not found" });
};

export const getFoods = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  if (user) {
    const foods = await Food.find();
    if (foods) {
      return res.json(foods);
    }
    return res.json({ message: "no food found for the vandor" });
  }

  return res.json({ message: "vandor information not found" });
};
