import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../constants";

const uploadOnCloudinary = async (localFilePath: string) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    console.log("FILE HAS BEEN UPLOADED SUCCESSFULLY");
    return response;
  } catch (error: any) {
    fs.unlinkSync(localFilePath); // removes the locally saved file as the upload operation got failed
    console.log("UPLOADING FILE FAILED :: ", error);
    return null;
  }
};

export { uploadOnCloudinary };
