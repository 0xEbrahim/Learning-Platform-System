import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { courseService } from "./course.service";
import ApiError from "../../utils/ApiError";

export const createCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const input: object[] = req.files as object[];
    const thumbnail = input[0];
    const video = input[1];
    const body = {
      video: video,
      thumbnail: thumbnail,
      ...data,
    };
    const course = await courseService.createCourse(body);
    if (!course)
      return next(new ApiError("Error happened while creating a course", 500));
    res.status(200).json({
      status: "Success",
      message: "Course created successfully",
      data: { course },
    });
  }
);

export const editCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.id;
    const data = req.files;
    const input: object[] = req.files as object[];
    const thumbnail = input[0];
    const video = input[1];
    const body = {
      ...data,
      id: courseId,
      thumbnail,
      video,
    };
    const course = await courseService.editCourse(data);
    if (!course)
      return next(new ApiError("Error happened while editting a course", 500));
    res.status(200).json({
      status: "Success",
      message: "Course updated successfully",
      data: { course },
    });
  }
);

export const getAllCourses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const courses = await courseService.getAllCourses(req);
    res.status(200).json({
      status: "Success",
      data: { courses },
    });
  }
);

export const getCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const course = await courseService.getCourse(req.params.id);
    if (!course)
      return next(
        new ApiError("Cannot find course of id: " + req.params.id, 404)
      );
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  }
);
