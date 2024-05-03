import express, { Request, Response, NextFunction } from "express";
import { Food, Offer, Order, Vandor } from "../models";
import { genToken, passCheck } from "../utility/passUtility";
import { EditVandorInput, addOfferInput, vandorLoginInput } from "../dto";
import { CreateFoodInput } from "../dto/Food.dto";
import { StatusCodes } from "http-status-codes";

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

  const { lat, lng } = req.body;

  if (user) {
    const vandor = await Vandor.findOne({ email: user.email });
    if (vandor) {
      vandor.serviceAvailable = !vandor.serviceAvailable;
      if (lat && lng) {
        vandor.lat = lat;
        vandor.lng = lng;
      }
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

export const getCurrentOrder = async (req: Request, res: Response) => {
  const user = res?.locals?.user;

  if (user) {
    const order = await Order.find({ vandorId: user.id }).populate(
      "items.food"
    );

    if (order) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "current orders", orders: order });
    }
  }

  return res.json({
    message: "something went wrong please try logging in again",
  });
};

export const processOrder = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const { status, remarks, time } = req.body;

  if (orderId) {
    const order = await Order.findById(orderId).populate("items.food");

    order.orderStatus = status;
    order.remarks = remarks;

    if (time) {
      order.readyTime = time;
    }

    const orderResult = await order.save();

    if (orderResult) {
      return res.status(StatusCodes.ACCEPTED).json({
        message: "order processed successfully",
        data: orderResult,
      });
    }
  }

  return res.json({
    message: "something went wrong please try logging in again",
  });
};

export const getOrderDetails = async (req: Request, res: Response) => {
  const orderId = req.params.id;

  if (orderId) {
    const order = await Order.findById(orderId).populate("items.food");

    if (order) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "current orders", orders: order });
    }
  }

  return res.json({
    message: "something went wrong please try logging in again",
  });
};

export const getOffers = async (req: Request, res: Response) => {
  const vandor = res.locals.user;

  if (vandor) {
    const order = await Offer.find({ vandor: vandor.id }).populate("vandor");

    if (order) {
      return res
        .status(StatusCodes.OK)
        .json({ message: "current orders", orders: order });
    }
  }

  return res.json({
    message: "something went wrong please try logging in again",
  });
};

export const addOffer = async (req: Request, res: Response) => {
  const user = res.locals.user;

  console.log(user);

  if (user) {
    const vandor = await Vandor.findById(user.id);

    if (vandor) {
      const offer = await Offer.create({
        ...(req.body as addOfferInput),
        vandor: [vandor],
      });
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ message: "offer added successfully", data: offer });
    }
  }
  return res.json({
    message: "something went wrong please try logging in again",
  });
};

export const editOffer = async (req: Request, res: Response) => {
  const user = res.locals.user;
  const offerId = req.params.id;

  if (user) {
    if (offerId) {
      const offer = await Offer.findByIdAndUpdate(
        offerId,
        req.body as addOfferInput,
        { new: true }
      );
      return res
        .status(StatusCodes.ACCEPTED)
        .json({ message: "offer updated successfully", data: offer });
    }
  }

  return res.json({
    message: "something went wrong please try logging in again",
  });
};
