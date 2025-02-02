import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import {
  getAllUsers,
  getUserById,
  getUserInfo,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "./user.controller";
import { uploadSingle } from "../../config/multer";
import validate from "../../utils/zodValidate";
import { getUserByIdValidation, updateInfoValidation } from "./user.validation";
import { isAuthorized } from "../../middlewares/isAuthorized";

const router = express.Router();

router.get("/", isAuthenticated, getAllUsers);
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
  "/update-role",
  isAuthenticated,
  isAuthorized("admin"),
  updateUserRole
);
router.patch(
  "/update-pic",
  isAuthenticated,
  uploadSingle,
  updateProfilePicture
);
export const userRouter = router;
