import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { uploadMany, uploadSingle } from "../../config/multer";
import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourse,
  getCourseByUser,
} from "./course.controller";
import { isAuthorized } from "../../middlewares/isAuthorized";

const router = express.Router();

router.post(
  "/",
  isAuthenticated,
  //   isAuthorized("teacher", "admin"),
  uploadMany,
  createCourse
);
router.get("/", isAuthenticated, getAllCourses);
router.get("/:id", isAuthenticated, getCourse);
router.get("/content/:id", isAuthenticated, getCourseByUser);
router.patch(
  "/:id",
  isAuthenticated,
  //   isAuthorized("teacher", "admin"),
  uploadMany,
  editCourse
);

export const courseRouter = router;
