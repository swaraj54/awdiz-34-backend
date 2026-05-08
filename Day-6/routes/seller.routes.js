import { Router } from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
} from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.post("/add-product", addProduct);
SellerRouter.get("/get-products", getProducts);
SellerRouter.put("/update-products", updateProduct);

export default SellerRouter;
