import { Request } from "express";
import { Document } from "mongoose";
import { IUser } from "../modules/users/user.interface";

export interface IUserRequset extends Request {
  user?: Document & IUser;
}
