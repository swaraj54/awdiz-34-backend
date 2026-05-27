import OrderModel from "../models/orders.schema.js";
import ProductModel from "../models/product.schema.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    const userId = req.userId;

    // Validate required fields
    if (
      !name ||
      !price ||
      !description ||
      !image ||
      !category ||
      !stock ||
      !userId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new ProductModel({
      name: name,
      price: price,
      description: description,
      image: image,
      category: category,
      stock: stock,
      seller: userId,
    });
    await newProduct.save();
    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await ProductModel.find({ seller: userId }).populate(
      "seller",
      "name email",
    );
    return res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const products = await ProductModel.find();
    for (let i = 0; i < products.length; i++) {
      if (!products[i]?.seller) {
        console.log("No seller found for product:", products[i]);
        await ProductModel.findByIdAndUpdate(products[i]._id, {
          seller: "",
          // seller: "69f5bd9ba5cded8f3172d9ca",
        });
      }
    }
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const sellerDashboard = async (req, res) => {
  try {
    const userId = req.userId;
    const products = await ProductModel.find({ seller: userId });

    const orders = await OrderModel.find({
      products: {
        $in: await ProductModel.find({ seller: userId }).select("_id"),
      },
    }).populate("products");

    orders.forEach((order) => {
      order.products = order.products.filter((pro) => pro.seller == userId);
    });

    const data = {
      productsCount: products.length,
      orders,
      ordersCount: orders.length,
    };
    return res.status(200).json({ data, success: true });
  } catch (error) {
    console.error("Error in sellerDashboard:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
