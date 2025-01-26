import nodemailer, { Transporter } from "nodemailer";
import { IEmail } from "../types/email";
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

  const emailInfo = {
    from: '"Ebrahim El-Sayed" <maddison53@ethereal.email>',
    to: options.email,
    subject: options.subject,
    html: options.template,
  };
  const info = await transporter.sendMail(emailInfo);
  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
