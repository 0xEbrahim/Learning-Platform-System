import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { creatOrder, getAllOrders } from "./order.controller";
const router = express.Router();

router.post("/", isAuthenticated, creatOrder);
router.get("/", isAuthenticated, getAllOrders);
export const orderRouter = router;
