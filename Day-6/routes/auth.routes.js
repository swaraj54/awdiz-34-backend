import { Router } from "express";
import { Login, Logout, Register } from "../controllers/auth.controllers.js";

const AuthRouter = Router();

AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", Logout);

export default AuthRouter;
