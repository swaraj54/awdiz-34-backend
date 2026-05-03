import UserModel from "../models/user.schema.js";

export const Profile = (req, res) => {
  res.send("User profile data from controller.");
};
export const Cart = (req, res) => {
  res.send("User cart data from controller.");
};
export const Orders = (req, res) => {
  res.send("User orders data from controller.");
};

export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const { name, email, password } = req.body;

    const userData = {};

    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = password;

    // console.log(userData, "userData");

    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
