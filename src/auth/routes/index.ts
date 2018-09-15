import { Router } from "express";
import { login } from "./login/login";
import { register } from "./register/register";

const authRoutes = Router();
authRoutes.post("/login", login);
authRoutes.post("/register", register);

export {authRoutes};
