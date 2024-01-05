import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const verifyJWT = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) throw new ApiError(401, "Unauthorized Request");

    const decodedToken: any = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET || ""
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid Access token");
  }
};
