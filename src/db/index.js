import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    console.log("CONNECTING TO DBs...", process.env.MONGO_URI);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log("CONNECTED TO DB");
    // console.log("MONGODB CONNECTED !! DB HOST::", connectionInstance);
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR::", error);
    throw error;
  }
};

export default connectToDB;
