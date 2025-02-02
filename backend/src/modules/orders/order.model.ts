import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "./order.interface";
import { Course } from "../courses/course.model";

const orderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,

      ref: "User",
    },
    payment_info: {
      type: Object,
      // required: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  const courseId = this.courseId.toString();
  await Course.findByIdAndUpdate(
    courseId,
    {
      $inc: {
        purchased: 1,
      },
    },
    { new: true }
  );
  next();
});
export const Order: Model<IOrder> = mongoose.model("Order", orderSchema);
