import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "users", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "products", required: true }],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
