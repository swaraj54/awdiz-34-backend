import ProductModel from "../models/product.schema.js";
import UserModel from "../models/user.schema.js";

export const sortProducts = async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    if (!sortBy || !sortOrder) {
      return res.status(400).json({
        message: "Please provide sortBy and sortOrder query parameters",
      });
    }
    const sortFilter = {};
    // if (sortOrder == "asc")
    //   sortFilter[sortBy] = 1;
    // } else {
    //   sortFilter[sortBy] = -1;
    // }
    sortFilter[sortBy] = sortOrder === "asc" ? 1 : -1;
    console.log(sortFilter, "sortFilter");

    const products = await ProductModel.find().sort(sortFilter).limit(3);
    res.status(200).json({ message: "Products sorted successfully", products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const paginationProducts = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 2;
    if (!page) {
      return res
        .status(400)
        .json({ message: "Please provide page query parameter" });
    }

    const products = await ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit);
    res
      .status(200)
      .json({ message: "Products paginated successfully", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { text } = req.query;
    if (!text) {
      return res
        .status(400)
        .json({ message: "Please provide text query parameter" });
    }
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: text, $options: "i" } },
        { description: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: "Products searched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const allProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      message: "All products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const matchingProducts = async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      // { $match: { price: { $in: [1000, 1200] } } },
      { $match: { price: { $gt: 1000 } } },
    ]);
    res
      .status(200)
      .json({ message: "Products matched successfully", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const groupingProducts = async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          totalQuantity: { $sum: "$stock" },
          totalPrice: { $sum: { $multiply: ["$price", "$stock"] } },
        },
      },
    ]);

    const usersData = await UserModel.aggregate([
      {
        $group: {
          _id: "$role",
          totalUsers: { $sum: 1 },
        },
      },
    ]);
    res
      .status(200)
      .json({ message: "Products grouped successfully", products, usersData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductsWithTags = async (req, res) => {
  try {
    const products = await ProductModel.updateMany(
      { $and: [{ price: { $gt: 1500 } }, { price: { $lt: 10000 } }] },
      { $addToSet: { tags: ["best seller"] } },
    );
    res
      .status(200)
      .json({ message: "Products updated successfully", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const unwindProducts = async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      { $match: { price: { $gte: 10000 } } },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", totalProducts: { $sum: 1 } } },
    ]);
    res
      .status(200)
      .json({ message: "Products unwound successfully", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const projectingProducts = async (req, res) => {
  try {
    const products = await ProductModel.aggregate([
      { $match: { price: { $gte: 10000 } } },
      { $project: { name: 1, price: 1, image: 1 } },
    ]);
    res
      .status(200)
      .json({ message: "Products projected successfully", products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
