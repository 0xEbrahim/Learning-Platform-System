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
