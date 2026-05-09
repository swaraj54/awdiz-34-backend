import UserModel from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ message: "User already exists, Please login." });
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
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found, Please register or check email." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password, Please try again." });
    }

    // token creation - jwt- jsonwebtoken 
    // store token into cookie

    return res
      .status(200)
      .json({ message: "User logged in successfully", user: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

export const Logout = (req, res) => {
  res.send("User logged out successfully from controller.");
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
