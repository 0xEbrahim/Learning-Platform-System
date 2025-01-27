import { Response } from "express";
import { IResponse } from "../types/response";
export default (res: Response, data: IResponse) => {
  res.status(data.statusCode).json({
    status: data.status,
    message: data.message,
    data: data.data,
    token: data.token,
  });
};
