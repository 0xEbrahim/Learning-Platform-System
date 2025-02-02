import mongoose, { Schema, Model } from "mongoose";
import { INotification } from "./notification.interface";

const notificationSchema: Schema<INotification> = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "unread",
  },
}. {
    timestamps: true
});

export const Notification : Model<INotification> = mongoose.model("Notification", notificationSchema)