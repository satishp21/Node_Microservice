import express, { Application } from "express";

import { adminRoutes, VandorRoutes, shoppingRoute } from "../routes";
import { customerRoute } from "../routes/customerRoutes.";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/admin", adminRoutes);
  app.use("/vandor", VandorRoutes);
  app.use("/shopping", shoppingRoute);
  app.use("/customer", customerRoute);

  return app;
};
