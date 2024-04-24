const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  console.log("into the cofig file>>>>>>>>>>>>>>>>>>>>>",configFile);

  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  APP_SECRET: "forBcrypt",
  BASE_URL: process.env.BASE_URL,
  EXCHANGE_NAME: "ONLINE_STORE",
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
};
