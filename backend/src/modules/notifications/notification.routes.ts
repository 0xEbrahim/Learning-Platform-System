import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getAllNotifications } from "./notification.controller";
const router = express.Router();

router.get("/", isAuthenticated, getAllNotifications);

export const notificationRouter = router;
