import cron from "node-cron";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { notificationService } from "./notification.service";
import { Notification } from "./notifications.model";

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

// delete notification
cron.schedule("0 0 0 * * *", async function () {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await Notification.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  // TODO: Log here
  console.log("Notifications deleted");
});
