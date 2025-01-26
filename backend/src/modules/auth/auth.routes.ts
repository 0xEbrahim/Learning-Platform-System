import express from "express";
import validate from "../../utils/zodValidate";
import { authValidation } from "./auth.validation";
import { register } from "./auth.controller";
const router = express.Router();

router.post("/register", validate(authValidation), register);

export const authRouter = router;
