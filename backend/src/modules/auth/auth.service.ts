import crypto from "crypto";
import { Document } from "mongoose";
import { IActivationBody } from "../../@types/body";
import sendEmail from "../../config/email";
import { generateActivationTemplate } from "../../views/ActivationTemplate";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { IResponse } from "../../@types/response";
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
    const encoded = crypto.createHash("256").update(token).digest("hex");
    const user: (Document & IUser) | null = await User.findOne({
      emailConfirmationToken: encoded,
      emailConfirmationTokenExpires: {
        $gt: Date.now(),
      },
    });
    const result: IResponse = {
      message: "Email Activated successfully, try to login now",
      statusCode: 200,
    };
    if (!user) {
      result.message =
        "Invalid or expired email activation token, try to request another code";
      result.statusCode = 403;
      return result;
    }
    user.email_confirmed = true;
    user.emailConfirmationToken = undefined;
    user.emailConfirmationTokenExpires = undefined;
    await user.save();
    return result;
  }
}

export const authService = new AuthService();
