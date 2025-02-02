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
  }
}

export const notificationService = new NotificationService();
