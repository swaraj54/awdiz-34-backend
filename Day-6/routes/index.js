import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import UserRouter from "./user.routes.js";
import AdminRouter from "./admin.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/user", UserRouter);
MainRouter.use("/admin", AdminRouter);

export default MainRouter;
