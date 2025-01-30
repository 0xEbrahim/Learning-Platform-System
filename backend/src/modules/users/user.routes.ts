import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getUserById, getUserInfo, updateUserInfo } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, getUserInfo);
router.get("/:id", isAuthenticated, getUserById);
router.patch("/update-me", isAuthenticated, updateUserInfo);
export const userRouter = router;
