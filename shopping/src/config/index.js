const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  console.log("into the cofig file>>>>>>>>>>>>>>>>>>>>>",configFile);

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: 3000,
  DB_URL:
    "mongodb+srv://piyush:G6DwXxwNJs5TjPgU@ecomm.f4xexjr.mongodb.net/?retryWrites=true&w=majority&appName=ecomm",
    // "mongodb://nosql-db/msytt_shopping",
  APP_SECRET: "forBcrypt",
  BASE_URL: process.env.BASE_URL,
  EXCHANGE_NAME: "ONLINE_STORE",
  MSG_QUEUE_URL:
    "amqps://iejtwyho:PIcoX2LlEnidw0KnhPHVvfanTPBZUDNr@puffin.rmq2.cloudamqp.com/iejtwyho",
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
};