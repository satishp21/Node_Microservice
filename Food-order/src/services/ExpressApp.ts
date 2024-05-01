import { Application } from "express";

import bodyParser from "body-parser";

import { adminRoutes, VandorRoutes, shoppingRoute } from "../routes";
import { customerRoute } from "../routes/customerRoutes.";

export default async (app: Application) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/admin", adminRoutes);
  app.use("/vandor", VandorRoutes);
  app.use("/shopping", shoppingRoute);
  app.use("/customer", customerRoute);

  return app;
};
