import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { roles } from "../../enums/roles";

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    googleId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    email_confirmed: {
      type: Boolean,
      default: false,
    },
    emailConfirmationToken: {
      type: String,
    },
    emailConfirmationTokenExpires: {
      type: Date,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpires: {
      type: Date,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: roles.STUDENT,
    },
    active: {
      type: Boolean,
    },
    twoStepAuth: {
      type: Boolean,
    },
    OTP: {
      type: String,
    },
    OTPExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
