import cookieParser from "cookie-parser";
import express, {
  Express,
  json,
  urlencoded,
  static as expressStatic,
} from "express";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    // origin: process.env.CORS_ORIGIN as string, // Ensure CORS_ORIGIN is of type string
    // origin: process.env.CORS_ORIGIN as string, // Ensure CORS_ORIGIN is of type string
    origin: "*",
    credentials: true,
  })
);

app.use(json({ limit: "16kb" })); // to set the limit of the json receiving
app.use(urlencoded({ extended: true, limit: "16kb" })); // to encode data coming from the URL
app.use(expressStatic("public")); // to set the asset directory
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.routes";

// Routes Declaration
app.use("/api/v1/users", userRouter);

export { app };
