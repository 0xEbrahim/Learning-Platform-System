import { AnyZodObject } from "zod";
import { fromError } from "zod-validation-error";
import { Request, Response, NextFunction } from "express";
import ApiError from "./ApiError";

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: any) {
      const error = fromError(err);
      next(new ApiError(error.toString(), 400));
    }
  };

export default validate;
