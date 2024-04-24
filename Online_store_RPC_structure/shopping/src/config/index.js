const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  DB_URL: process.env.MONGODB_URI,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  PORT: 8002,
  APP_SECRET: "forBcrypt",
  EXCHANGE_NAME: "ONLINE_STORE",
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
};
