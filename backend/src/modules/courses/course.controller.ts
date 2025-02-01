import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import cloudinary from "../../config/cloudinary";
import { courseService } from "./course.service";
import ApiError from "../../utils/ApiError";

export const createCourse = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const input : object[] = req.files as object[];
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
  async (req: Request, res: Response, next: NextFunction) => {}
);
