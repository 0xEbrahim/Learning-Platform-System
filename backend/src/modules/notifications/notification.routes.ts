import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import {
  getAllNotifications,
  updateNotificationStatus,
} from "./notification.controller";
const router = express.Router();

router.get("/", isAuthenticated, getAllNotifications);
router.patch("/:id", isAuthenticated, updateNotificationStatus);

export const notificationRouter = router;
