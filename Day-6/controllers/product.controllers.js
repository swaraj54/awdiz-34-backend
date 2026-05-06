import ProductModel from "../models/product.schema.js";

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
