import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { uploadMany, uploadSingle } from "../../config/multer";
import { createCourse, editCourse } from "./course.controller";
import { isAuthorized } from "../../middlewares/isAuthorized";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  //   isAuthorized("teacher", "admin"),
  uploadMany,
  createCourse
);

router.patch(
  "/edit-course/:id",
  isAuthenticated,
  //   isAuthorized("teacher", "admin"),
  uploadMany,
  editCourse
);

export const courseRouter = router;
