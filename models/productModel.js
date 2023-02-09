const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
      lowercase: true,
      // unique: true,
    },
    note: {
      type: String,
    },
    image: {
      type: String,
      default: "/images/sample.jpg",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    // selected: {
    //   type: String,
    //   required: true,
    //   enum: ['notSelected', 'selected'],
    //   default: 'notSelected',
    // },
    // selected: {
    //   type: Boolean,
    //   default: false,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
