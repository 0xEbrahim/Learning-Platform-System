import { Request } from "express";
import cloudinary from "../../config/cloudinary";
import ApiFeatures from "../../utils/ApiFeatures";
import { ICourse } from "./course.interface";
import { Course } from "./course.model";

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
    const course = await Course.findById(id);
    return course;
  }
}

export const courseService = new CourseService();
