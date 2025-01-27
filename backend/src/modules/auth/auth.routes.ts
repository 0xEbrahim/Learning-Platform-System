import express, { Request, Response, NextFunction } from "express";
import validate from "../../utils/zodValidate";
import {
  activateEmailValidation,
  authValidation,
  confirmEmailValidation,
  confirmTwoStepAuthValidation,
  forgotPasswordValidation,
  loginValidation,
  resetPasswordValidation,
  updatePasswordValidation,
} from "./auth.validation";
import {
  activateEmail,
  activateTwoStepAuth,
  confirmEmail,
  confirmTwoStepAuth,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  twoFA,
  updatePassword,
} from "./auth.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello" });
});

router.post("/register", validate(authValidation), register);
router.post("/login", validate(loginValidation), login);
router.post("/logout", isAuthenticated, logout);
router.get(
  "/activate-account",
  validate(activateEmailValidation),
  activateEmail
);
router.patch(
  "/forgot-password",
  validate(forgotPasswordValidation),
  forgotPassword
);
router.get("/reset-password", validate(resetPasswordValidation), resetPassword);
router.get("/2fa", validate(confirmTwoStepAuthValidation), twoFA);
router.patch(
  "/update-password",
  isAuthenticated,
  validate(updatePasswordValidation),
  updatePassword
);
router.patch("/activate-2fa", isAuthenticated, activateTwoStepAuth);
router.get(
  "/confirm-2fa",
  isAuthenticated,
  validate(confirmTwoStepAuthValidation),
  confirmTwoStepAuth
);
router.patch("/confirm-email", validate(confirmEmailValidation), confirmEmail);

export const authRouter = router;
