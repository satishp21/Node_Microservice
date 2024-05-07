const express = require("express");
const cors = require("cors");
const redis = require("redis");
const { customer } = require("./api");
const { CreateChannel } = require("./utils");

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  let redisClient;
  redisClient = redis.createClient({
    // url: "redis://default:bFFixdZSZG7gWimnasULNItL9Xlo0chC@redis-10957.c16.us-east-1-2.ec2.redns.redis-cloud.com:10957",
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();

  const channel = await CreateChannel();

  customer(app, channel, redisClient);
};
