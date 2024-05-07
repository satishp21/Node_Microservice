const express = require("express");
const cors = require("cors");
const redis = require("redis");
const path = require("path");
const { products, appEvents } = require("./api");

const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  let redisClient;
  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  const channel = await CreateChannel();

  products(app, channel, redisClient);
};
