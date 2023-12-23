import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // to set the limit of the json receiving
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to encode data comming from the url ie the "+" or "%20" comes in in the url
app.use(express.static("public")); // to set the asset directory
app.use(cookieParser());

export { app };
