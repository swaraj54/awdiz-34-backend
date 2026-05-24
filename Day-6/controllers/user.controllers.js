import UserModel from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CartModel from "../models/cart.schema.js";
import OrderModel from "../models/orders.schema.js";
import ProductModel from "../models/product.schema.js";

export const Profile = (req, res) => {
  try {
    const userId = req.userId;
    const userData = req.userData;
    console.log(userId, "userId");
    console.log(userData, "userData");
    userData.password = req.userPassword;
    return res.status(200).json({ success: true, profileData: userData });
    res.send(true);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const existingCart = await CartModel.findOne({ user: userId });
    if (existingCart) {
      existingCart.products.push(productId);
      await existingCart.save();
      return res.status(200).json({
        message: "Product added to cart",
        cart: existingCart,
        success: true,
      });
    } else {
      const newCart = new CartModel({
        user: userId,
        products: [productId],
      });
      await newCart.save();
      return res.status(200).json({
        message: "Product added to cart",
        cart: newCart,
        success: true,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const getCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    const userProductsData = await CartModel.findOne({ user: userId }).populate(
      "products",
    );
    const totalPrice = userProductsData.products.reduce(
      (total, product) => total + product.price,
      0,
    );
    return res
      .status(200)
      .json({ success: true, userProductsData, totalPrice: totalPrice });
  } catch (error) {
    console.log(error, "error");
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

// create order schema done
// product id , price done
// totalPrice done
// erase cart data done

// reduce stock by 1 Done

// display seller orders

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const cartData = await CartModel.findOne({ user: userId }).populate(
      "products",
    );
    if (!cartData || cartData.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    console.log(cartData, "cartData");

    for (let i = 0; i < cartData.products.length; i++) {
      const product = await ProductModel.findById(cartData.products[i]._id);
      if (product.stock <= 0) {
        cartData.products.splice(i, 1);
      } else {
        product.stock -= 1;
        await product.save();
      }
    }

    const newOrder = new OrderModel({
      user: userId,
      products: cartData.products,
      totalPrice: cartData.products.reduce(
        (total, product) => total + product.price,
        0,
      ),
    });
    await newOrder.save();

    cartData.products = [];
    await cartData.save();

    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await OrderModel.find({ user: userId }).populate("products");

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};
export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { name, email, password } = req.body;

    const userData = {};

    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = await bcrypt.hash(password, 10);

    // console.log(userData, "userData");

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    const userNewData = {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      profileData: updatedUser,
      success: true,
      userData: userNewData,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
