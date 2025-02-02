import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { IOrder } from "./order.interface";
import { IUserRequset } from "../../interfaces/userRequest";
import { orderService } from "./order.service";
import ApiError from "../../utils/ApiError";

export const creatOrder = asyncHandler(
  async (req: IUserRequset, res: Response, next: NextFunction) => {
    req.body.userId = req.user?._id;
    const order = await orderService.createOrder(req.body as IOrder);
    if (!order) next(new ApiError("Error while creating order", 400));
    res.status(201).json({
      status: "Success",
      data: {
        order: order,
      },
    });
  }
);

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderService.getAllCourse(req.query);
    res.status(200).json({
      status: "Success",
      data: {
        orders,
      },
    });
  }
);
