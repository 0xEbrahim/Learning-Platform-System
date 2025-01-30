import { Document } from "mongoose";
import { User } from "./user.model";
import { IUser } from "./user.interface";

class UserService {
  async getUserById(id: string): Promise<(Document & IUser) | null> {
    const user: (Document & IUser) | null = await User.findById(id);
    return user;
  }
}

export const userService = new UserService();
