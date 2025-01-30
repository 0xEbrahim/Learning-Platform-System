import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import {
  getUserById,
  getUserInfo,
  updateProfilePicture,
  updateUserInfo,
} from "./user.controller";
import { uploadSingle } from "../../config/multer";

const router = express.Router();

router.get("/me", isAuthenticated, getUserInfo);
router.get("/:id", isAuthenticated, getUserById);
router.patch("/update-me", isAuthenticated, updateUserInfo);
router.patch(
  "/update-pic",
  isAuthenticated,
  uploadSingle,
  updateProfilePicture
);
export const userRouter = router;
