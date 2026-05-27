import { Router } from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  sellerDashboard,
} from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.post("/add-product", addProduct);
SellerRouter.get("/get-products", getProducts);
SellerRouter.put("/update-products", updateProduct);
SellerRouter.get("/dashboard", sellerDashboard);

export default SellerRouter;
