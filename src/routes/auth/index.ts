import { Router } from "express";
import { login } from "./login/login";
import { register } from "./register/register";

const router = Router();
router.post("/login", login);
router.post("/register", register);

export default router;
