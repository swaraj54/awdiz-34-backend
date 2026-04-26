import { Router } from "express";
import { Cart, Orders, Profile } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.post("/profile", Profile);
UserRouter.post("/cart", Cart);
UserRouter.post("/orders", Orders);

export default UserRouter;
