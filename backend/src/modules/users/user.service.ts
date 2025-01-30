import { Document } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import { IUpdateProfilePic, IUpdateUserInfo } from "../../types/body";
import config from "../../config/env";
import ApiError from "../../utils/ApiError";
import { generateActivationTemplate } from "../../views/ActivationTemplate";
import sendEmail from "../../config/email";
import cloudinary from "../../config/cloudinary";
class UserService {
  async getUserById(id: string): Promise<(Document & IUser) | null> {
    const user: (Document & IUser) | null = await User.findById(id);
    return user;
  }

  async updateUserInfo(Payload: IUpdateUserInfo) {
    const { id, email, name } = Payload;
    const user = await User.findById(id);
    if (!user) throw new ApiError("Cannot find this user right now", 500);
    if (name) user.name = name;
    if (email) {
      const isEmailExist = await User.findOne({ email: email });
      if (isEmailExist) throw new ApiError("This email is already used", 409);
      user.email = email;
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
    }
    await user.save();
    return user;
  }

  async updateProfilePic(Payload: IUpdateProfilePic) {
    const { id, path } = Payload;
    const user = await User.findById(id as string);
    if (!user) throw new ApiError("User not found", 404);
    const uplaoded = await cloudinary.uploader.upload(path as string, {
      folder: "users",
    });
    user.avatar = {
      public_id: uplaoded.public_id,
      url: uplaoded.secure_url,
    };
    await user.save();
    return user;
  }
}

export const userService = new UserService();
