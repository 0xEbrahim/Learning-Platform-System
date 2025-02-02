import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { creatOrder, getAllOrders } from "./order.controller";
import { isAuthorized } from "../../middlewares/isAuthorized";
const router = express.Router();

router.post("/", isAuthenticated, creatOrder);
router.get("/", isAuthenticated, isAuthorized("admin"), getAllOrders);
export const orderRouter = router;
