import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["clothing", "footwear", "electronics"],
  },
  stock: { type: Number, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  tags: [{ type: String }],
});

const ProductModel = model("products", ProductSchema);

export default ProductModel;
