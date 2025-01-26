import mongoose from "mongoose";
import config from "./env";

export const connectDB = () =>
  mongoose
    .connect(config.DB_URI as string)
    .then(() => console.log("DB connected successfully"));
