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

export const updateNotificationStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = { query: req.query, id: req.params.id };
    const notifications = await notificationService.updateNotificationStatus(
      data
    );
    res.status(200).json({
      status: "Success",
      data: {
        notifications,
      },
    });
  }
);
