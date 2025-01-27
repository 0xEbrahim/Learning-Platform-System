import crypto from "crypto";
import { Document } from "mongoose";
import {
  IActivationBody,
  IConfirmEmail,
  IConfirmTwoStepAuth,
  IForgotPassword,
  ILoginBody,
  IResetPassword,
  IUpdatePasswordBody,
} from "../../types/body";
import config from "../../config/env";
import sendEmail from "../../config/email";
import { generateActivationTemplate } from "../../views/ActivationTemplate";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { IResponse } from "../../types/response";
import { generateRefreshToken, generateToken } from "../../utils/JWT/tokens";
import { generateTwoStepTemplate } from "../../views/TwoFATemplate";
import { Token } from "../../utils/JWT/token.model";
import { generateForgotPasswordTemplate } from "../../views/forgotPasswordTemplate";
class AuthService {
  async register(Payload: IUser): Promise<IUser | null> {
    const user = await User.create(Payload);
    const token = user.generateEmailConfirmationToken();
    await user.save();
    const link = `http://localhost:3000/api/v1/auth/activate-account/`;
    const template = generateActivationTemplate(token, user.name, link);
    const data = {
      email: user.email,
      subject: "Acount activation",
      template,
    };
    await sendEmail(data);
    return user;
  }

  async activateEmail(Payload: IActivationBody): Promise<IResponse> {
    const { token } = Payload;
    const encoded = crypto.createHash("sha256").update(token).digest("hex");
    console.log(encoded);
    const user: (Document & IUser) | null = await User.findOne({
      emailConfirmationToken: encoded,
      emailConfirmationTokenExpires: {
        $gt: Date.now(),
      },
    });
    const result: IResponse = {
      status: "Success",
      message: "Email Activated successfully, try to login now",
      statusCode: 200,
    };
    if (!user) {
      result.message =
        "Invalid or expired email activation token, try to request another code";
      result.statusCode = 403;
      result.status = "Fail";
      return result;
    }
    user.email_confirmed = true;
    user.emailConfirmationToken = undefined;
    user.emailConfirmationTokenExpires = undefined;
    await user.save();
    return result;
  }

  async confirmEmail(Payload: IConfirmEmail): Promise<IUser | null> {
    const { email } = Payload;
    const user: (Document & IUser) | null = await User.findOne({
      email: email,
    });
    if (!user) return null;
    const token = user.generateEmailConfirmationToken();
    await user.save();
    let link;
    if (config.NODE_ENV === "development")
      link = `${config.DEV_URL}api/v1/auth/activate-account`;
    else link = `${config.PROD_URL}api/v1/auth/activate-account`;
    const template = generateActivationTemplate(token, user.name, link);
    const data = {
      email: user.email,
      subject: "Acount activation",
      template,
    };
    await sendEmail(data);
    return user;
  }

  async login(Payload: ILoginBody): Promise<IResponse | null> {
    const { email, password } = Payload;
    const user: (Document & IUser) | null = await User.findOne({
      email: email,
    });
    const result: IResponse = {
      message: "Logged-in successfully",
      status: "Success",
      statusCode: 200,
    };
    if (!user || !(await user.comparePassword(password))) {
      return null;
    }
    if (!user.email_confirmed) {
      result.message =
        "Cannot login before confirming your email, please confirm it and try again.";
      result.status = "error";
      result.statusCode = 409;
      return result;
    }
    if (user.twoStepAuth) {
      const otp = await user.generateOTP();
      await user.save();
      let link;
      if (config.NODE_ENV === "development")
        link = `${config.DEV_URL}api/v1/auth/2fa`;
      else link = `${config.PROD_URL}api/v1/auth/2fa`;
      const template = generateTwoStepTemplate(otp, user.name, link);
      const data = {
        email: user.email,
        subject: "2FA Code",
        template,
      };
      await sendEmail(data);
      result.message = "OTP sent, please check your email";
      result.status = "Success";
      result.statusCode = 200;
      return result;
    }
    user.password = undefined;
    result.data = user;
    const token = generateToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);
    result.token = token;
    result.refreshToken = refreshToken;
    return result;
  }

  async updatePassword(Payload: IUpdatePasswordBody): Promise<IResponse> {
    const { user, oldPassword, password } = Payload;
    const result: IResponse = {
      message:
        "Password updated successfully and you have been logged-out. please login again with the new password",
      status: "Success",
      statusCode: 200,
    };
    if (!(await user.comparePassword(oldPassword))) {
      result.message = "Old password is wrong, please try again";
      result.status = "Error";
      result.statusCode = 401;
      return result;
    }
    user.password = password;
    user.passwordChangedAt = new Date(Date.now());
    await user.save();
    return result;
  }

  async activateTwoStepAuth(Payload: Document & IUser): Promise<IResponse> {
    const result: IResponse = {
      message: "We sent you a OTP, please check your email to activate 2FA",
      status: "Success",
      statusCode: 200,
    };
    const user = Payload;
    const otp: string = user.generateOTP();
    await user.save();
    let link;
    if (config.NODE_ENV === "development")
      link = `${config.DEV_URL}api/v1/auth/confirm-2fa`;
    else link = `${config.PROD_URL}api/v1/auth/confirm-2fa`;
    console.log(link);
    const template = generateTwoStepTemplate(otp, user.name, link);
    const data = {
      email: user.email,
      subject: "2FA activation",
      template,
    };
    await sendEmail(data);
    return result;
  }

  async confirmTwoStepAuth(Payload: IConfirmTwoStepAuth): Promise<IResponse> {
    const { user, otp } = Payload;
    const result: IResponse = {
      message: "2FA activated successfully",
      statusCode: 200,
      status: "Success",
    };
    const decoded = crypto.createHash("sha256").update(otp).digest("hex");
    const cUser = await User.findOne({
      OTP: decoded,
      OTPExpires: {
        $gt: Date.now(),
      },
    });
    if (!cUser) {
      result.message =
        "Invalid or expired OTP code, please try again with another one.";
      result.status = "Fail";
      result.statusCode = 400;
      return result;
    }
    cUser.twoStepAuth = true;
    cUser.OTP = undefined;
    cUser.OTPExpires = undefined;
    await cUser.save();
    return result;
  }

  async forgotPassword(Payload: IForgotPassword): Promise<IResponse> {
    const { email } = Payload;
    const user = await User.findOne({ email: email });
    const result: IResponse = {
      message: "We sent password reset link, check your email",
      status: "Success",
      statusCode: 200,
    };
    if (!user) {
      result.message = "Email is not exist";
      result.status = "Error";
      result.statusCode = 400;
      return result;
    }
    const token = user.generatePasswordResetToken();
    await user.save();
    let link;
    if (config.NODE_ENV === "development")
      link = `${config.DEV_URL}api/v1/auth/reset-password?token=${token}`;
    else link = `${config.PROD_URL}api/v1/auth/reset-password?token=${token}`;
    const template = generateForgotPasswordTemplate(user.name, link);
    const data = {
      email: user.email,
      subject: "Password reset",
      template,
    };
    await sendEmail(data);
    return result;
  }

  async twoFA(Payload: IConfirmTwoStepAuth): Promise<IResponse> {
    const result: IResponse = {
      message: "Logged-In successfully",
      status: "Success",
      statusCode: 200,
    };
    const { otp } = Payload;
    const decoded = crypto.createHash("sha256").update(otp).digest("hex");
    const user = await User.findOne({
      OTP: decoded,
      OTPExpires: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      result.message =
        "Invalid or expired OTP code, please try again with another one.";
      result.status = "Fail";
      result.statusCode = 400;
      return result;
    }

    const token = generateToken(user._id as string);
    const refreshToken = generateRefreshToken(user._id as string);
    result.token = token;
    result.refreshToken = refreshToken;
    user.twoStepAuth = true;
    user.OTP = undefined;
    user.OTPExpires = undefined;
    await user.save();
    user.password = undefined;
    result.data = user;
    return result;
  }

  async resetPassword(Payload: IResetPassword): Promise<IResponse> {
    const result: IResponse = {
      message: "Password reset successfully",
      status: "Success",
      statusCode: 200,
    };
    const { token, password } = Payload;
    const decoded = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: decoded,
      passwordResetTokenExpires: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      result.message = "Invalid or expired token, try again with another token";
      result.status = "Fail";
      result.statusCode = 400;
      return result;
    }
    user.password = password;
    await user.save();
    return result;
  }
}

export const authService = new AuthService();
