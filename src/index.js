// require("dotenv").config();
import dotenv from "dotenv";
import connectToDB from "./db/index.js";

dotenv.config({
  path: "/.env",
});

connectToDB();

/*
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log("APP LISTENING AT :: ", process.env.PORT);
    });
  } catch (error) {
    console.log("CONNECT DB ERROR:: ", error);
    throw error;
  }
})();
*/
