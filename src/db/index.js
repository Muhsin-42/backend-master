import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR::", error);
    throw error;
  }
};

export default connectToDB;
