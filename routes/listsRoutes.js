const express = require("express");
const router = express.Router();
const {
  createList,
  updateListStatus,
  getLists,
  getList,
} = require("../controllers/listController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").get(protect, getList).put(protect, updateListStatus);

module.exports = router;
