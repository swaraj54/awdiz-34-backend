import { Router } from "express";
import {
  Login,
  Logout,
  Register,
  UpdateUserPassword,
} from "../controllers/auth.controllers.js";

const AuthRouter = Router();

AuthRouter.post("/register", Register);
AuthRouter.put("/update-user-password", UpdateUserPassword);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", Logout);

export default AuthRouter;
