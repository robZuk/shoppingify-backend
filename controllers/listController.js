const User = require("../models/userModel");
const List = require("../models/listModel");

// @desc    Get user lists
// @route   GET /api/lists
// @access  Private
const getLists = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
};

// @desc    Create list
// @route   POST /api/lists/
// @access  Private
const createList = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const { name, products } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add a name");
  }
  if (!products) {
    res.status(400);
    throw new Error("Please add a products");
  }

  const list = await List.create({
    name,
    products,
    user: req.user.id,
  });

  res.status(200).json(list);
};

// @desc    Get user list
// @route   GET /api/lists/:id
// @access  Private
const getList = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(list);
};

// @desc    Update list
// @route   PUT /api/lists/:id
// @access  Private
const updateListStatus = async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }

  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedList);
};

module.exports = { createList, getLists, getList, updateListStatus };
