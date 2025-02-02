import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";

import { notificationService } from "./notification.service";

export const getAllNotifications = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await notificationService.getAllNotifications(
      req.query
    );
    res.status(200).json({
      status: "Success",
      data: {
        notifications,
      },
    });
  }
);
