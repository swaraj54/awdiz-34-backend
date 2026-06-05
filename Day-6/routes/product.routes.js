import { Router } from "express";
import {
  sortProducts,
  paginationProducts,
  searchProducts,
  allProducts,
  singleProduct,
  groupingProducts,
  updateProductsWithTags,
  unwindProducts,
  projectingProducts,
} from "../controllers/product.controllers.js";

const ProductRouter = Router();

ProductRouter.get("/sort", sortProducts);
ProductRouter.get("/pagination", paginationProducts);
ProductRouter.get("/search", searchProducts);
ProductRouter.get("/all-products", allProducts);
ProductRouter.get("/single-product/:id", singleProduct);
ProductRouter.get("/grouping", groupingProducts);
ProductRouter.get("/update-products-with-tags", updateProductsWithTags);
ProductRouter.get("/unwind", unwindProducts);
ProductRouter.get("/projecting", projectingProducts);

export default ProductRouter;
