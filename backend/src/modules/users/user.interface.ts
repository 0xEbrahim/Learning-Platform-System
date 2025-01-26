import { roles } from "../../enums/roles";

export interface IUser {
  _id?: string;
  googleId?: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: roles;
  avatar?: string;
  active: boolean;
  email_confirmed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  emailConfirmationToken?: string;
  passwordResetTokenExpires?: Date;
  emailConfirmationTokenExpires?: Date;
  twoStepAuth?: boolean;
  OTP?: string;
  OTPExpires?: Date;
}
