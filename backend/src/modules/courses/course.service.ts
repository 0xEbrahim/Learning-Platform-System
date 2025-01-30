import cloudinary from "../../config/cloudinary";
import { Course } from "./course.model";

class CourseService {
  async createCourse(Payload: any) {
    const data = Payload;
    const { thumbnail } = data;
    let uploaded;
    if (thumbnail) {
      uploaded = await cloudinary.uploader.upload(thumbnail.path, {
        folder: "Courses",
      });
      data.thumbnail = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    }
    const course = await Course.create(data);
    return course;
  }

  async editCourse() {}
}

export const courseService = new CourseService();
