import { validate, ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { plainToClass } from "class-transformer";
import express, { Request, Response, NextFunction } from "express";
import {
  CreateCustomerInputs,
  CustomerLoginInputs,
  EditCustomerInputs,
  orderInputs,
} from "../dto/customer.dto";
import { Customer } from "../models/Customet";
import { genHash, genOtp, genToken, onRequestOTP, passCheck } from "../utility";
import { Food, Order } from "../models";

export const customerSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(CreateCustomerInputs, req.body);

  const inputErrors = await validate(customerInputs);

  if (inputErrors.length > 0) {
    return res.status(400).json(inputErrors);
  }
  const { email, phone, password } = customerInputs;

  const existingUser = await Customer.findOne({ email });

  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).json({
      statusCode: StatusCodes.CONFLICT,
      message: "user already exists with mentioned mail",
    });
  }

  const hashedpass = await genHash(password);

  const { otp, expiry } = await genOtp();

  const result = await Customer.create({
    email: email,
    password: hashedpass,
    otp: otp,
    phone: phone,
    otp_expiry: expiry,
    firstName: "",
    lastName: "",
    address: "",
    verified: false,
    lat: 0,
    lng: 0,
  });

  if (result) {
    await onRequestOTP(otp, phone);
    const token = await genToken({
      email: result?.email,
      id: String(result?._id),
      verified: result?.verified,
    });

    return res.status(StatusCodes.OK).json({
      data: result,
      message: "customer created sucessfully",
      token: token,
      email: result?.email,
      id: String(result?._id),
      verified: result?.verified,
    });
  }
};

export const customerSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const loginInputs = plainToClass(CustomerLoginInputs, { email, password });
  const loginErrors = await validate(loginInputs);

  if (loginErrors.length > 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({ loginErrors });
  }

  const customer = await Customer.findOne({ email });

  if (customer) {
    const check = await passCheck(password, customer.password);

    if (!check) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "The password entered is incorrect. Please use the correct password.",
      });
    }

    const token = await genToken({
      email: customer.email,
      verified: customer.verified,
      id: String(customer._id),
    });

    return res.status(StatusCodes.OK).json({
      message: "Customer signed in successfully",
      token,
      email: customer.email,
      id: String(customer._id),
      verified: customer.verified,
    });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "Something went wrong" });
};

export const customerVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { otp } = req.body;
  const user = res.locals.user;

  if (user) {
    const profile = await Customer.findById(user.id);

    if (profile) {
      if (profile.otp === parseInt(otp) && profile.otp_expiry >= new Date()) {
        profile.verified = true;
        const updateProfile = await profile.save();

        const token = await genToken({
          email: updateProfile?.email,
          id: String(updateProfile?._id),
          verified: updateProfile?.verified,
        });

        return res.status(StatusCodes.OK).json({
          message: "customer verified sucessfully",
          token: token,
          email: profile?.email,
          verified: profile?.verified,
        });
      }
    }

    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "please provide valid OTP",
    });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "User doesnt exist" });
};

export const requestOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user) {
    const profile = await Customer.findById(user.id);

    if (profile) {
      const { otp, expiry } = await genOtp();
      profile.otp = otp;
      profile.otp_expiry = expiry;

      Promise.all([profile?.save(), onRequestOTP(otp, profile?.phone)]);

      res
        .status(StatusCodes.OK)
        .json({ message: "otp sent on your registered number" });
    }
  }
};

export const getCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  const profile = await Customer.findById(user.id);
  if (profile) {
    return res.status(StatusCodes.OK).json({ data: profile });
  }
  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "something went wrong" });
};

export const editCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  const profile = await Customer.findById(user.id);

  const { firstName, lastName, phone, address } = req.body;

  if (profile) {
    const error = await validate(EditCustomerInputs, req.body);

    if (error.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }

    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.phone = phone;
    profile.address = address;

    await profile.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "profile updated successfully" });
  }
};

export const addToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  console.log(user, "this is your userrrrrrr");

  if (user) {
    const profile = await Customer.findById(user.id).populate("cart.food");

    console.log(profile, ">>>>>>>this is the profile");

    let cartItems = Array();

    const { _id, unit } = <orderInputs>req.body;

    const food = await Food.findById(_id);

    if (food) {
      if (profile) {
        console.log(profile.cart, ">>>>>>>>>>>>>>profile.cart");

        cartItems = profile?.cart;

        if (cartItems.length > 0) {
          let existinFoodItem = cartItems.filter(
            (item) => String(item.food._id) === _id
          );
          if (existinFoodItem.length > 0) {
            const index = cartItems.indexOf(existinFoodItem[0]);

            if (unit > 0) {
              cartItems[index] = { food, unit };
            } else {
              cartItems.splice(index, 1);
            }
          } else {
            cartItems.push({ food, unit });
          }
        } else {
          cartItems.push({ food, unit });
        }
        if (cartItems) {
          profile.cart = cartItems as any;
          const cartResult = await profile.save();
          return res.status(StatusCodes.ACCEPTED).json(cartResult.cart);
        }
      }
    }
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "something went wrong while creating order" });
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user) {
    const orders = await Customer.findById(user.id)?.populate("cart.food");

    return res
      .status(StatusCodes.OK)
      .json({ message: "order fetched successfully", orders: orders?.cart });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "something went wrong please login again" });
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user) {
    const profile = await Customer.findById(user.id);

    if (profile) {
      profile.cart = [] as any;

      const cart = await profile.save();

      return res.status(StatusCodes.OK).json({
        message: "cart deleted successfully successfully",
        cart: cart,
      });
    }
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "something went wrong please login again" });
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  const profile = await Customer.findById(user.id);

  if (user) {
    const orderId = `${Math.floor(Math.random() * 89999) + 1000}`;

    const cart = <[orderInputs]>req.body;

    let cartItems = Array();

    let netAmount = 0.0;

    const foods = await Food.find()
      .where("_id")
      .in(cart.map((items) => items._id))
      .exec();

    foods.map((food) => {
      cart.map(({ _id, unit }) => {
        if (String(food._id) == _id) {
          netAmount += food.price * unit;
          cartItems.push({ food, unit });
        }
      });
    });

    if (cartItems) {
      const currentOrder = await Order.create({
        orderId: orderId,
        items: cartItems,
        totalAmount: netAmount,
        orderDate: new Date(),
        paidThrough: "COD",
        PaymentResponse: "",
        orderStatus: "Waiting",
      });

      if (currentOrder) {
        profile.orders.push(currentOrder);
        const profileResponse = await profile.save();

        return res.status(StatusCodes.ACCEPTED).json(currentOrder);
      }
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "something went wrong while creating order" });
  }
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (user) {
    const orders = await Customer.findById(user.id)?.populate("orders");

    return res
      .status(StatusCodes.OK)
      .json({ message: "order fetched successfully", orders: orders });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "something went wrong please login again" });
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  const orderId = req.params.id;

  if (user) {
    const order = await Order.findById(orderId).populate("items.food");

    return res
      .status(StatusCodes.OK)
      .json({ message: "order fetched successfully", orders: order });
  }

  return res
    .status(StatusCodes.BAD_REQUEST)
    .json({ message: "something went wrong please login again" });
};
