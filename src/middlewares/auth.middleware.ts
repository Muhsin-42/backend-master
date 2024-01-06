import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ACCESS_TOKEN_SECRET } from "../constants";

export const verifyJWT = asyncHandler(async (req: any, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    console.log("ACCESS_TOKEN_SECRET ", ACCESS_TOKEN_SECRET);
    const decodedToken: any = jwt.verify(token, ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("36 ERROR:: ", error);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
