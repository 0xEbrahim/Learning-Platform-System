import ejs from "ejs";
import ApiError from "../../utils/ApiError";
import { Course } from "../courses/course.model";
import { User } from "../users/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import path from "node:path";
import sendEmail from "../../config/email";
import { Notification } from "../notifications/notifications.model";

class OrderService {
  async createOrder(Payload: IOrder): Promise<any> {
    const { courseId, userId, payment_info } = Payload;
    const user = await User.findById(userId);
    const isExist = user?.courses.find((el: any) => el.toString() === courseId);
    if (isExist)
      throw new ApiError("You have already purchased this course before.", 400);
    const course = await Course.findById(courseId);
    if (!course) throw new ApiError("Course not found.", 404);
    const data: any = {
      courseId: course._id,
      userId: user?._id,
    };
    const order = Order.create(data);
    const mailData = {
      order: {
        _id: courseId.toString().slice(0, 6),
        name: course.name,
        price: course.price,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    };
    const html = await ejs.renderFile(
      path.join(__dirname, "../../views/email-confirmation.ejs"),
      { order: mailData }
    );
    try {
      if (user) {
        await sendEmail({
          email: user.email,
          subject: "Order Confirmation",
          template: html,
          //   data: mailData,
        });
      }
    } catch (err: any) {
      throw new ApiError(err.message, 400);
    }
    user?.courses.push(courseId.toString());
    await user?.save();
    const notificatoin = Notification.create({
      user: user?._id,
      title: "New order",
      message: "You have a new Order for " + course.name + " Course",
    });
    return order;
  }
}

export const orderService = new OrderService();
