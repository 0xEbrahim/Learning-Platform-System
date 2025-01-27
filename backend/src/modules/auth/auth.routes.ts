import express, { Request, Response, NextFunction } from "express";
import validate from "../../utils/zodValidate";
import {
  activateEmailValidation,
  authValidation,
  confirmEmailValidation,
  loginValidation,
  updatePasswordValidation,
} from "./auth.validation";
import {
  activateEmail,
  activateTwoStepAuth,
  confirmEmail,
  login,
  register,
  updatePassword,
} from "./auth.controller";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
const router = express.Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Hello" });
});

router.post("/register", validate(authValidation), register);
router.post("/login", validate(loginValidation), login);

router.get(
  "/activate-account",
  validate(activateEmailValidation),
  activateEmail
);

router.patch(
  "/update-password",
  isAuthenticated,
  validate(updatePasswordValidation),
  updatePassword
);
router.patch("/activate-2fa", isAuthenticated, activateTwoStepAuth);
router.patch("/confirm-email", validate(confirmEmailValidation), confirmEmail);

export const authRouter = router;
