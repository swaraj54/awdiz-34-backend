import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import UserRouter from "./user.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/user", UserRouter);

export default MainRouter;
