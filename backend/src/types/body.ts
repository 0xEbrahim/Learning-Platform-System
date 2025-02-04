import { Document } from "mongoose";
import { IUser } from "../modules/users/user.interface";



export type IConfirmEmail = {
  email: string;
};

export type ILoginBody = {
  email: string;
  password: string;
};

export type IUpdatePasswordBody = {
  user: Document & IUser;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type IConfirmTwoStepAuth = {
  user?: Document & IUser;
  otp: string;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type IRefresh = {
  token?: string;
};

export type IUpdateUserInfo = {
  id?: string;
  name?: string;
  email?: string;
};

export type IUpdateProfilePic = {
  id?: string;
  path?: string;
};
