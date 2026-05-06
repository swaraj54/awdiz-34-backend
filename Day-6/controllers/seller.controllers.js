import ProductModel from "../models/product.schema.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    // Validate required fields
    if (!name || !price || !description || !image || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new ProductModel({
      name: name,
      price: price,
      description: description,
      image: image,
      category: category,
      stock: stock,
    });
    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
