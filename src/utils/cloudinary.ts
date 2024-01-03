import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("FILE HAS BEEN UPLOADED SUCCESSFULLY", response.url);
    return response;
  } catch (error: any) {
    fs.unlinkSync(localFilePath); // removes the locally saved file as the upload operation got failed
    console.log("UPLOADING FILE FAILED");
    return null;
  }
};

export { uploadOnCloudinary };
