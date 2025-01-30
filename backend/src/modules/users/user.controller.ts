import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { IUserRequset } from "../../interfaces/userRequest";
import { userService } from "./user.service";
import ApiError from "../../utils/ApiError";
import { IUpdateUserInfo } from "../../types/body";
import { blackListToken } from "../../utils/JWT/tokens";

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

export const updateUserInfo = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const body: IUpdateUserInfo = {
      id: req.user?._id,
      name: req.body.name,
      email: req.body.email,
    };
    const user = await userService.updateUserInfo(body);
    if (!user) return next(new ApiError("Can't update this user at time", 500));
    blackListToken(req, res, next);
    res.status(200).json({
      status: "Success",
      message: "User updated successfully, logIn again",
    });
  }
);

export const updateProfilePicture = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    const path = req.file?.path;
    const userId = req.user?._id;
    const user = await userService.updateProfilePic({
      id: userId as string,
      path,
    });
    if (!user)
      return next(new ApiError("Error while updating the profile pic", 500));
    res.status(200).json({
      status: "Success",
      message: "Profile picture updated successfully",
      data: { user },
    });
  }
);

/**
 * TODO:
 *  - delete user
 *  - Deactivate user
 *  - Ban user
 *  - Get all users
 */
