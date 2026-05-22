import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
