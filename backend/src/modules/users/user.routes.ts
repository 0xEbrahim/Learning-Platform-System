import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { getUserById, getUserInfo } from "./user.controller";

const router = express.Router();

router.get("/me", isAuthenticated, getUserInfo);
router.get("/:id", isAuthenticated, getUserById);
export const userRouter = router;
