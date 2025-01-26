import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
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
      // select: false
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
      default: true,
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

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateEmailConfirmationToken = function (): string {
  const token = crypto.randomBytes(64).toString("hex");
  const encoded = crypto.createHash("sha256").update(token).digest("hex");
  this.emailConfirmationToken = encoded;
  this.emailConfirmationTokenExpires = Date.now() + 10 * 60 * 1000;
  return token;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
