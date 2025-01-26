import express from "express";
import validate from "../../utils/zodValidate";
import {
  activateEmailValidation,
  authValidation,
  confirmEmailValidation,
  loginValidation,
} from "./auth.validation";
import {
  activateEmail,
  confirmEmail,
  login,
  register,
} from "./auth.controller";
const router = express.Router();

router.post("/register", validate(authValidation), register);
router.post("/login", validate(loginValidation), login);
router.get(
  "/activate-account",
  validate(activateEmailValidation),
  activateEmail
);
router.patch("/confirm-email", validate(confirmEmailValidation), confirmEmail);

export const authRouter = router;
