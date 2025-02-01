import { roles } from "../../enums/roles";

export interface IUser {
  _id?: string;
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  passwordChangedAt?: Date;
  role: roles;
  avatar?: {
    public_id: string;
    url: string;
  };
  courses: [string];
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
  comparePassword: (password: string) => Promise<Boolean>;
  generateEmailConfirmationToken: () => string;
  generateOTP: () => string;
  generatePasswordResetToken: () => string;
}
