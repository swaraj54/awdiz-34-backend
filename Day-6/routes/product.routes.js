import { Router } from "express";
import {
  sortProducts,
  paginationProducts,
  searchProducts,
  allProducts,
  singleProduct,
} from "../controllers/product.controllers.js";

const ProductRouter = Router();

ProductRouter.get("/sort", sortProducts);
ProductRouter.get("/pagination", paginationProducts);
ProductRouter.get("/search", searchProducts);
ProductRouter.get("/all-products", allProducts);
ProductRouter.get("/single-product/:id", singleProduct);

export default ProductRouter;
