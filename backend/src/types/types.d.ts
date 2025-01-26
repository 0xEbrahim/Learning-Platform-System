import * as express from "express";
import { User } from "../modules/users/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
