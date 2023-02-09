const User = require("../models/userModel");
const Product = require("../models/productModel");
// const { default: mongoose } = require("mongoose");

// @desc    Get category products
// @route   GET /api/products/:productId
// @access  Private
const getProducts = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const products = await Product.find({
    user: req.user.id,

    name: {
      $regex: req.query.keyword,
      $options: "i",
    },
  });

  res.status(200).json(products);
};

// @desc    Get product
// @route   GET /api/products/:id
// @access  Private
const getProduct = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(product);
};

// @desc    Create category product
// @route   POST /api/products/
// @access  Private
const addProduct = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { name, note, image, category } = req.body;

  const product = await Product.create({
    name,
    note,
    image,
    category,
    user: req.user.id,
  });

  res.status(200).json(product);
};

// @desc    Update product status
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
