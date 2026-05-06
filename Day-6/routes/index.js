import { Router } from "express";
import AuthRouter from "./auth.routes.js";
import UserRouter from "./user.routes.js";
import AdminRouter from "./admin.routes.js";
import ProductRouter from "./product.routes.js";
import SellerRouter from "./seller.routes.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/user", UserRouter);
MainRouter.use("/admin", AdminRouter);
MainRouter.use("/product", ProductRouter);
MainRouter.use("/seller", SellerRouter);

export default MainRouter;
