import crypto from "crypto";
import { Document } from "mongoose";
import {
  IActivationBody,
  IConfirmEmail,
  IConfirmTwoStepAuth,
  ILoginBody,
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
      data: "",
      token: "",
      refreshToken: "",
    };
    if (!user || !(await user.comparePassword(password))) {
      return null;
    }
    if (!user.email_confirmed) {
      result.message =
        "Cannot login before confirming your email, please confirm it and try again.";
      result.status = "error";
      result.statusCode = 409;
      result.data = undefined;
      result.token = undefined;
      result.refreshToken = undefined;
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
      link = `${config.DEV_URL}api/v1/auth/activate-2fa`;
    else link = `${config.PROD_URL}api/v1/auth/activate-2fa`;
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
    const cUser = await User.findOne({
      OTP: otp,
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

}

export const authService = new AuthService();
