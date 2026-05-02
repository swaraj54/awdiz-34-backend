import UserModel from "../models/user.schema.js";

export const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new UserModel({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    console.log("New User:", newUser);
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { name, email, password, role },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const Login = (req, res) => {
  res.send("User logged in successfully from controller.");
};

export const Logout = (req, res) => {
  res.send("User logged out successfully from controller.");
};
