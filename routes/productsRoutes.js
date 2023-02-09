const express = require("express");
const router = express.Router();
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, addProduct).get(protect, getProducts);

router
  .route("/:id")
  .get(protect, getProduct)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
