import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { baseUrl } = req;
    const isProfilePic = baseUrl === "/api/v1/users";
    cb(null, `${__dirname}/../public/${isProfilePic ? "users" : ""}`);
  },
  filename: function (req, file, callback) {
    const fileName =
      Math.random() * Date.now() +
      "_" +
      parseInt(
        Math.ceil(Math.random() * Date.now())
          .toPrecision(16)
          .toString()
          .replace(".", "")
      ) +
      path.extname(file.originalname);
    callback(null, fileName);
  },
});
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

export const uploadSingle = uplaoder.single("image");
export const uploadMany = uplaoder.array("image");
