import multer from "multer";
import { IUserRequset } from "../interfaces/userRequest";

const storage = multer.memoryStorage();
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  )
    cb(null, true);
  else cb({ message: "Unsupported file format" }, false);
};

const uplaoder = multer({
  storage,
  fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

const uploadSingle = uplaoder.single("image");
const uploadMany = uplaoder.array("image");
