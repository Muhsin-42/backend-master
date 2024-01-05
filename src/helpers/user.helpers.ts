import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

export const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateRefreshToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // to disable the password validating before saving
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something Went Wrong while generating tokens.");
  }
};
