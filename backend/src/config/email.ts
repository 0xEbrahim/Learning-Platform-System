import nodemailer, { Transporter } from "nodemailer";
import { IEmail } from "../@types/email";
import config from "./env";
const sendEmail = async (options: IEmail) => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT),
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
};
