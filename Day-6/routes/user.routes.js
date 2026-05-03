import { Router } from "express";
import {
  Cart,
  Orders,
  Profile,
  UpdateProfile,
} from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.post("/profile", Profile);
UserRouter.post("/cart", Cart);
UserRouter.post("/orders", Orders);
UserRouter.patch("/update-profile/:userId", UpdateProfile);
// UserRouter.patch("/delete-acccount/:userId", DeleteAccount);

export default UserRouter;
