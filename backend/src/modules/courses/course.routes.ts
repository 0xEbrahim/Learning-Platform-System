import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { uploadSingle } from "../../config/multer";
import { createCourse } from "./course.controller";
import { isAuthorized } from "../../middlewares/isAuthorized";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  isAuthorized("teacher", "admin"),
  uploadSingle,
  createCourse
);

export const courseRouter = router;
