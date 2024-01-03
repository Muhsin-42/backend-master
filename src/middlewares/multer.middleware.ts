import multer from "multer";
import { getUniqueSuffix } from "../utils";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + getUniqueSuffix());
  },
});

export const upload = multer({ storage });
