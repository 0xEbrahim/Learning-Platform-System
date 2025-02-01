import { Document } from "mongoose";
import { IUser } from "../users/user.interface";

export interface IComment extends Document {
  user: string;
  question: string;
  questionReplies?: IComment[];
}

export interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies?: object[];
}

export interface ILink extends Document {
  title: string;
  url: string;
}

export interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased: number;
}

export interface IQuestion {
  user: string;
  question: string;
  courseId: string;
  contentId: string;
}

export interface IAnswer {
  user: string;
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export interface IAddReview {
  user: string;
  courseId: string;
  rating: number;
  review: string;
}

export interface IReviewReply {
  user: string;
  comment: string;
  courseId: string;
  reviewId: string;
}
