import express, { Application } from "express";

import {
  adminRoutes,
  VandorRoutes,
  shoppingRoute,
  DeliveryRoute,
} from "../routes";
import { customerRoute } from "../routes/customerRoutes.";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/admin", adminRoutes);
  app.use("/vandor", VandorRoutes);
  app.use("/shopping", shoppingRoute);
  app.use("/customer", customerRoute);
  app.use("/delivery", DeliveryRoute);

  return app;
};
