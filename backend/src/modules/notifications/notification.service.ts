import ApiError from "../../utils/ApiError";
import ApiFeatures from "../../utils/ApiFeatures";
import { Notification } from "./notifications.model";

class NotificationService {
  async getAllNotifications(payload: any) {
    const features = new ApiFeatures(Notification.find(), payload)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    features.query.sort({ createdAt: -1 });
    const notifications = await features.query;
    return notifications;
  }

  async updateNotificationStatus(Payload: any) {
    const notification = await Notification.findById(Payload.id);
    if (!notification) throw new ApiError("Invalid notification id", 404);
    notification.status = "read";
    await notification.save();
    const features = new ApiFeatures(Notification.find(), Payload.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    features.query.sort({ createdAt: -1 });
    const notifications = await features.query;
    return notifications;
  }
}

export const notificationService = new NotificationService();
