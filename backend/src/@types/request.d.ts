import { IUser } from "../modules/users/user.interface";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document & IUser;
    }
  }
}
