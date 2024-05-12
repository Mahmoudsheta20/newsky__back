const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "localhost",
  PORT: process.env.PORT || 3000,
  EMAIL_ADDRESS: process.env.YOUR_EMAIL_ADDRESS || null,
  EMAIL_PASSWORD: process.env.YOUR_EMAIL_PASSWORD || null,
  AMADEUS_CLIENT_ID: process.env.AMADEUS_CLIENT_ID,
  AMADEUS_CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET,
};
