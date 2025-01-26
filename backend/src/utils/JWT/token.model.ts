import mongoose, { Schema, Model } from "mongoose";
import { IToken } from "./token.interface";

const tokenSchema: Schema<IToken> = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Token: Model<IToken> = mongoose.model("Token", tokenSchema);
