import { Router } from "express";
import {
  addToCart,
  getCartProduct,
  getOrders,
  placeOrder,
  Profile,
  UpdateProfile,
} from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.post("/profile", Profile);
UserRouter.post("/add-to-cart", addToCart);
UserRouter.get("/get-cart-products", getCartProduct);
UserRouter.post("/place-order", placeOrder);
UserRouter.post("/get-orders", getOrders);
UserRouter.patch("/update-profile", UpdateProfile);
// UserRouter.patch("/delete-acccount/:userId", DeleteAccount);

export default UserRouter;
