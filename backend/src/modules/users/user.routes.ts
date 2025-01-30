import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getUserInfo } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, getUserInfo);

export const userRouter = router;
