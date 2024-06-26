import express from "express";

import App from "./services/ExpressApp";

import dbconnection from "./services/Database";

const StartServer = async () => {
  const app = express();

  await dbconnection();

  await App(app);

  app.listen(8000, () => {
    console.log("listening on port 8000");
  });
};

StartServer();
