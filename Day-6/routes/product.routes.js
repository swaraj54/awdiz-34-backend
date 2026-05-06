import { Router } from "express";
import { sortProducts , paginationProducts, searchProducts} from "../controllers/product.controllers.js";

const ProductRouter = Router();

ProductRouter.get("/sort", sortProducts);
ProductRouter.get("/pagination", paginationProducts);
ProductRouter.get("/search", searchProducts);

export default ProductRouter;
