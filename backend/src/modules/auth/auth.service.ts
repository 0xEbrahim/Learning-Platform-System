import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { authValidation } from "./auth.validation";
class AuthService {
  async register(Payload: IUser): Promise<IUser | null> {
    const user = await User.create(Payload);
    return user;
  }
}

export const authService = new AuthService();
