import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../constants";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: { type: String, required: [true, "Password is required"] },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

//Pre middleware functions are executed just before saving or any other actions
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Custom methods
userSchema.methods.isPasswordCorrect = async function (pass: string) {
  console.log("pass ", pass);
  console.log("this.pass ", this.password);
  console.log("this.pass ", await bcrypt.compare(this.password, pass));
  return await bcrypt.compare(pass, this.password);
  //   this.password is the encrypted password from db
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
