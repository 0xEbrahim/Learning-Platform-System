import mongoose, { Document } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  user: mongoose.Schema.Types.ObjectId;
}
