import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { IUserRequset } from "../../interfaces/userRequest";
import { userService } from "./user.service";
import { IUser } from "./user.interface";
import ApiError from "../../utils/ApiError";

export const getUserInfo = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const userId: string = req.user?._id as string;
    const user = await userService.getUserById(userId);
    if (!user)
      return next(new ApiError("Error while getting user profile", 401));
    user.password = undefined;
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  }
);

export const getUserById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user)
      return next(new ApiError("Can't find the user with id: " + id, 404));
    user.password = undefined;
    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  }
);
