import dotenv from "dotenv";
import connectToDB from "./db/index";
import { app } from "./app";
import { PORT } from "./constants";

dotenv.config({
  path: "./.env",
});

connectToDB().then(() => {
  app.on("ERROR", (error: any) => {
    console.log("ERROR: ", error);
    throw error;
  });

  app.listen(PORT || 8000, () => {
    console.log("SERVER RUNNING AT :: ", PORT);
  });
}).catch;

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
