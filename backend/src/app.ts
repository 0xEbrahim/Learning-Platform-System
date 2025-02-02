import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import helmet from "helmet";
dotenv.config();
import config from "./config/env";
import { authRouter } from "./modules/auth/auth.routes";
import { globalErrorHandler } from "./middlewares/error";
import { userRouter } from "./modules/users/user.routes";
import { courseRouter } from "./modules/courses/course.routes";
import { orderRouter } from "./modules/orders/order.routes";
import { notificationRouter } from "./modules/notifications/notification.routes";
const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
});
app.use(limiter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(config.NODE_ENV === "production" ? morgan("combined") : morgan("dev"));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "Success",
    message: "Learner system is up to work",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use(globalErrorHandler);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    status: "Error",
    message: "Resource not found",
  });
});
export default app;
