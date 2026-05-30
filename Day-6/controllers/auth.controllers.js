import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists, Please login.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });
    console.log("New User:", newUser);
    await newUser.save();
    return res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: error.message,
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found, Please register or check email.",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password, Please try again.",
        success: false,
      });
    }

    // token creation - jwt- jsonwebtoken
    // store token into cookie
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    console.log(token, "token");
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: "User logged in successfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message,
      success: false,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Data:", decodedData);
    const user = await UserModel.findById(decodedData.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      message: "Current user retrieved successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting current user", error: error.message });
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging out user", error: error.message });
  }
};

export const UpdateUserPassword = async (req, res) => {
  try {
    const users = await UserModel.find();
    // for (let i = 0; i < users.length - 2; i++) {
    //   console.log("Users:", users[i]);
    //   const hashedPassword = await bcrypt.hash(users[i].password, 10);
    //   await UserModel.findByIdAndUpdate(users[i]._id, {
    //     password: hashedPassword,
    //   });
    // }
    res.send(true);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user password", error: error.message });
  }
};
