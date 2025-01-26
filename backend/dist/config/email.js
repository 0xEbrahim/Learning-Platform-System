"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("./env"));
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: env_1.default.SMTP_HOST,
        port: Number(env_1.default.SMTP_PORT),
        auth: {
            user: env_1.default.SMTP_USER,
            pass: env_1.default.SMTP_PASS,
        },
    });
    const emailInfo = {
        from: '"Ebrahim El-Sayed" <maddison53@ethereal.email>',
        to: options.email,
        subject: options.subject,
        html: options.template,
    };
    const info = yield transporter.sendMail(emailInfo);
    console.log("Message sent: %s", info.messageId);
});
exports.default = sendEmail;
