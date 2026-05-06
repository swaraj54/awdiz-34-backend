import { Router } from "express";
import { addProduct, getProducts } from "../controllers/seller.controllers.js";

const SellerRouter = Router();

SellerRouter.post("/add-product", addProduct);
SellerRouter.get("/get-products", getProducts);

export default SellerRouter;
