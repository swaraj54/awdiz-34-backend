import { Router } from "express";
import {
  Login,
  Logout,
  Register,
  UpdateUserPassword,
  getCurrentUser,
} from "../controllers/auth.controllers.js";

const AuthRouter = Router();

AuthRouter.post("/register", Register);
AuthRouter.put("/update-user-password", UpdateUserPassword);
AuthRouter.post("/login", Login);
AuthRouter.get("/get-current-user", getCurrentUser);
AuthRouter.get("/logout", Logout);

export default AuthRouter;
