import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  watchHistory: Schema.Types.ObjectId[];
  username: string;
  email: string;
  fullname: string;
  avatar: string;
  coverImage: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVideo extends Document {
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  owner: Schema.Types.ObjectId;
  duration: Number;
  views: Number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
