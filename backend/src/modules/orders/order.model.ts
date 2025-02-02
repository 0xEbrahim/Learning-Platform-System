import mongoose, { Schema, Model } from "mongoose";
import { IOrder } from "./order.interface";

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

export const Order: Model<IOrder> = mongoose.model("Order", orderSchema);
