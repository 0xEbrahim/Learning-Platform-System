import { Request } from "express";
import cloudinary from "../../config/cloudinary";
import ApiFeatures from "../../utils/ApiFeatures";
import {
  IAddReview,
  IAnswer,
  ICourse,
  IQuestion,
  IReviewReply,
} from "./course.interface";
import { Course } from "./course.model";
import ApiError from "../../utils/ApiError";
import { User } from "../users/user.model";
import { Notification } from "../notifications/notifications.model";

class CourseService {
  async createCourse(Payload: any): Promise<ICourse | null> {
    const data = Payload;
    const { thumbnail, video } = data;
    let uploaded;
    let uplaodedVideo;
    if (thumbnail) {
      uploaded = await cloudinary.uploader.upload(thumbnail.path, {
        folder: "Courses",
      });
      data.thumbnail = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    }
    if (video) {
      uplaodedVideo = await cloudinary.uploader.upload(video.path, {
        resource_type: "video",
        folder: "CourseData",
      });
      data.courseData[0].videoUrl = uplaodedVideo.secure_url;
    }
    const course = await Course.create(data);
    return course;
  }

  async editCourse(Payload: any): Promise<any> {
    const data = Payload;
    const { thumbnail, id, video } = Payload;
    let uploaded;
    let uplaodedVideo;
    if (thumbnail) {
      uploaded = await cloudinary.uploader.upload(thumbnail.path, {
        folder: "Courses",
      });
      data.thumbnail = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    }
    if (video) {
      uplaodedVideo = await cloudinary.uploader.upload(video.path, {
        resource_type: "video",
        folder: "CourseData",
      });
      data.courseData[0].videoUrl = uplaodedVideo.secure_url;
    }
    const course = await Course.findByIdAndUpdate(id, data, { new: true });
    return course;
  }

  async getAllCourses(req: Request): Promise<ICourse[] | null> {
    const features = new ApiFeatures(Course.find(), req.query)
      .filter()
      .limitFields()
      .sort()
      .paginate();
    const courses = await features.query;
    return courses;
  }

  async getCourse(id: string): Promise<ICourse | null> {
    const course = await Course.findById(id).select(
      "-courseData.videoUrl -__v -courseData.questions"
    );
    return course;
  }

  async deleteCourse(Payload: any) {
    const course = await Course.findById(Payload);
    if (!course) throw new ApiError("Invalid user id", 404);
    await Course.findByIdAndDelete(course._id);
    return course;
  }

  async getCourseByUser(Payload: any): Promise<any> {
    const { courses, courseId } = Payload;
    const isExist = courses.find((el: any) => el.toString() === courseId);
    if (!isExist)
      throw new ApiError("You are not eligable to open this course", 401);
    const course = await Course.findById(courseId);
    return course?.courseData;
  }

  async addQuestion(Payload: IQuestion) {
    const { user, question, contentId, courseId } = Payload;
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError("Invalid course id", 400);
    const courseContent = course.courseData.find(
      (el: any) => el._id.toString() === contentId
    );
    if (!courseContent) throw new ApiError("Invalid content id", 400);
    const newQuestion: any = {
      user: user,
      question: question,
      questionReplies: [],
    };
    courseContent.questions.push(newQuestion);
    await Notification.create({
      user: user,
      title: "New Question Recieved",
      message: `You have a new question in ${courseContent.title}`,
    });
    await course.save();
    return course;
  }

  async addAnswerToQuestion(Payload: IAnswer) {
    const { user, answer, questionId, contentId, courseId } = Payload;
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError("Invalid course id", 400);
    const courseContent = course.courseData.find(
      (el: any) => el._id.toString() === contentId
    );
    if (!courseContent) throw new ApiError("Invalid content id", 400);
    const question = courseContent.questions.find(
      (el: any) => el._id.toString() === questionId
    );
    if (!question) throw new ApiError("Invalid question id", 400);
    const newAnswer: any = {
      user,
      answer,
    };
    question.questionReplies?.push(newAnswer);
    await course.save();
    // TODO:
    if (user === question.user.toString()) {
      await Notification.create({
        user: user,
        title: "New Question Reply Recieved",
        message: `You have a new question in ${courseContent.title}`,
      });
    } else {
      // Send Email
    }
    return course;
  }

  async addReview(Payload: IAddReview) {
    const { user, courseId, rating, review } = Payload;
    let userCourseList = (await User.findById(user))?.courses;
    if (!userCourseList)
      throw new ApiError("You are not elegiable to add review", 401);
    const isExist = userCourseList.find(
      (el: any) => el.toString() === courseId
    );
    if (!isExist)
      throw new ApiError("You are not elegiable to add review", 401);
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError("Invalid course id", 400);
    const newReview: any = {
      comment: review,
      rating,
      courseId,
      user,
    };
    course?.reviews.push(newReview);
    await course?.save();

    return course;
  }

  async addReplyToReview(Payload: IReviewReply) {
    const { comment, courseId, reviewId, user } = Payload;
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError("Invalid course id", 400);
    const review = course.reviews.find(
      (el: any) => el._id.toString() === reviewId
    );
    if (!review) throw new ApiError("Review not found", 404);
    const replyData: any = {
      user: user,
      comment,
    };
    if (!review.commentReplies) review.commentReplies = [];
    review.commentReplies?.push(replyData);
    await course.save();
    return course;
  }
}

export const courseService = new CourseService();
