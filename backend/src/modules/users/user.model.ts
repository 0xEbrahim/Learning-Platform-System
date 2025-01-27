import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import otpGen from "otp-generator";
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
  this.password = bcrypt.hashSync(this.password as string, 12);
  this.passwordChangedAt = new Date(Date.now());
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
  this.emailConfirmationTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  return token;
};

userSchema.methods.generateOTP = function (): string {
  const otp = otpGen.generate(6, {
    digits: true,
  });
  const decoded = crypto.createHash("sha256").update(otp).digest("hex");
  this.OTP = decoded;
  this.OTPExpires = new Date(Date.now() + 10 * 60 * 1000);
  return otp;
};

userSchema.methods.generatePasswordResetToken = function (): string {
  const token = crypto.randomBytes(64).toString("hex");
  const encoded = crypto.createHash("sha256").update(token).digest("hex");
  this.passwordResetToken = encoded;
  this.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);
  return token;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
