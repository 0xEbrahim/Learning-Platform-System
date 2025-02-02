import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { creatOrder } from "./order.controller";
const router = express.Router();

router.post("/", isAuthenticated, creatOrder);

export const orderRouter = router;
