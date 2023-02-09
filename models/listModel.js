const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
    },
    // price: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   lowercase: true,
    // },
    // categories: [
    //   {
    //     category: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: true,
    //       ref: "Category",
    //     },
    //   },
    // ],
    products: { type: Array, required: true },
    // products: [
    //   {
    //     product: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       required: true,
    //       ref: "Product",
    //     },
    //     // confirmed: false,
    //   },
    // ],
    // completed: {
    //   type: Boolean,
    //   default: false,
    // },
    status: {
      type: String,
      required: true,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    // products: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("List", listSchema);
