import UserModel from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CartModel from "../models/cart.schema.js";

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
    return res.status(200).json({ success: true, userProductsData });
  } catch (error) {
    console.log(error, "error");
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const Orders = (req, res) => {
  res.send("User orders data from controller.");
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
