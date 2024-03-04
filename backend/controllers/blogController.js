const Blog = require("../models/blogModel");
const mongoose = require("mongoose");

// GET all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET a single blog
const getSingleBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST a blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!content) {
    emptyFields.push("content");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Please fill in all fields:`, emptyFields });
  }
  // add document to db
  try {
    const blog = await Blog.create({ title, content, author });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }

  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(200).json({ message: "Blog deleted successfully" });
};

// UPDATE a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Blog not found" });
  }
  const blog = await Blog.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!blog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.status(200).json(blog);
};

module.exports = {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
