import express, { Request, Response, NextFunction } from "express";
import {
  getFoodAvailability,
  getFoodsIn30mins,
  getOffersByPincode,
  getTopRestaurants,
  restaurantById,
  searchFoods,
} from "../controller";

const router = express();

//food availability
router.get("/:pincode", getFoodAvailability);

// top resturent
router.get("/top-restaurants/:pincode", getTopRestaurants);

// food available in 30 min
router.get("/foods-in-30-min/:pincode", getFoodsIn30mins);

// search foods
router.get("/search/:pincode", searchFoods);

// find restaurant by ID
router.get("/restaurant/:id", restaurantById);

// find offers
router.get("/offers/:pincode", getOffersByPincode);

export { router as shoppingRoute };
