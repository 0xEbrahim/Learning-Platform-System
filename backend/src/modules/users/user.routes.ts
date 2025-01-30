import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import {
  getUserById,
  getUserInfo,
  updateProfilePicture,
  updateUserInfo,
} from "./user.controller";
import { uploadSingle } from "../../config/multer";
import validate from "../../utils/zodValidate";
import { getUserByIdValidation, updateInfoValidation } from "./user.validation";

const router = express.Router();

router.get("/me", isAuthenticated, getUserInfo);
router.get(
  "/:id",
  isAuthenticated,
  validate(getUserByIdValidation),
  getUserById
);
router.patch(
  "/update-me",
  isAuthenticated,
  validate(updateInfoValidation),
  updateUserInfo
);
router.patch(
  "/update-pic",
  isAuthenticated,
  uploadSingle,
  updateProfilePicture
);
export const userRouter = router;
