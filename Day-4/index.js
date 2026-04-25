import express from "express";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(time, req.url, req.method, "Request received");
  next();
});

app.use((req, res, next) => {
  if (req.body?.isUserAuthenticated == true) {
    return next();
  } else {
    return res.send("Not authenticate.");
  }
});

const products = [
  { id: 1, name: "Tshirt" },
  { id: 2, name: "Tshirt" },
  { id: 3, name: "Tshirt" },
  { id: 4, name: "Tshirt" },
  { id: 5, name: "Tshirt" },
];

const mymiddelware = (req, res, next) => {
  try {
    console.log("Middleware executed");
    const isUserAuthenticated = true; // Replace with actual authentication logic
    if (isUserAuthenticated) {
      return next();
    } else {
      return res.send("Not authenticate.");
    }
    console.log("Middleware executed after next");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

app.get("/all-products", mymiddelware, (req, res) => {
  return res.json(products);
});

app.post("/create-product", (req, res) => {
  console.log(req.body);
  const { id, name } = req.body;
  products.push({ id: id, name: name });
  return res.json({
    success: true,
    message: "Product created successfully",
    products: products,
  });
});

app.put("/update-product/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(id, name, "id name");
  const product = products.find((p) => p.id === parseInt(id));
  console.log(product, "product");
  if (product) {
    product.name = name;
    return res.json({
      success: true,
      message: "Product updated successfully",
      products: products,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

app.delete("/delete-product/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === parseInt(id));
  if (index !== -1) {
    products.splice(index, 1);
    return res.json({
      success: true,
      message: "Product deleted successfully",
      products: products,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
