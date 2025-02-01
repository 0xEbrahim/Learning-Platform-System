import mongoose, { Schema, Model } from "mongoose";
import {
  IComment,
  ICourse,
  ICourseData,
  ILink,
  IReview,
} from "./course.interface";

const reviewSchema: Schema<IReview> = new Schema<IReview>({
  user: {
    type: Object,
  },
  rating: {
    type: Number,
    default: 0,
  },
  comment: {
    type: String,
  },
});

const linkSchema: Schema<ILink> = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema: Schema<IComment> = new Schema<IComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

const courseDataSchema: Schema<ICourseData> = new Schema<ICourseData>({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema: Schema<ICourse> = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    tags: {
      required: true,
      type: String,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Course: Model<ICourse> = mongoose.model("Course", courseSchema);
