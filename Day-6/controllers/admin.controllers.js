import UserModel from "../models/user.schema.js";

export const AllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "user" });

    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const SingleUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const singleUser = await UserModel.findById(userId);

    if (!singleUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ user: singleUser, message: "Single user fetched successfully" });
  } catch (error) {
    console.log("Error fetching single user:", error);
    return res
      .status(500)
      .json({ message: "Error fetching single user", error: error.message });
  }
};
