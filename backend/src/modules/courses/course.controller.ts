import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { courseService } from "./course.service";
import ApiError from "../../utils/ApiError";
import { IUserRequset } from "../../interfaces/userRequest";
import { IAddReview, IAnswer, IReviewReply } from "./course.interface";

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

export const getCourseByUser = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const courses = req.user?.courses;
    const courseId = req.params.id;
    const data = {
      courses,
      courseId,
    };
    const course = await courseService.getCourseByUser(data);
    res.status(200).json({
      status: "Success",
      data: { courseContent: course },
    });
  }
);

export const addQuestion = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const { question, courseId, contentId } = req.body;
    const data = {
      question,
      contentId,
      courseId,
      user: req.user?._id as string,
    };
    const course = await courseService.addQuestion(data);
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  }
);

export const addAnswerToQuestion = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const { courseId, answer, contentId, questionId } = req.body;
    const user = req.user?._id as string;
    const data: IAnswer = { answer, courseId, contentId, user, questionId };
    const course = await courseService.addAnswerToQuestion(data);
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  }
);

export const addReview = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const { review, rating } = req.body;
    const courseId = req.params.id;
    const user = req.user?._id as string;
    const data: IAddReview = { user, courseId, rating, review };
    const course = await courseService.addReview(data);
    const notification = {
      title: "New review Recieved",
      message: `${req.user?.name} has given a review on ${course?.name}`,
    };

    // Create notification

    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  }
);

export const addReplyToReview = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const user = req.user?._id as string;
    const { courseId, reviewId, comment } = req.body;
    const body: IReviewReply = { user, courseId, reviewId, comment };
    const course = await courseService.addReplyToReview(body);
    res.status(200).json({
      status: "Success",
      data: {
        course,
      },
    });
  }
);
