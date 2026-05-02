import { ModifiedPathsSnapshot, Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
});

const ProductModel = model("products", ProductSchema);

export default ProductModel;
