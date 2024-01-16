const express = require("express");
const { create } = require("../models/blogModel");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

// GET all blogs
router.get("/", getAllBlogs);

// GET a single blog
router.get("/:id", getSingleBlog);

// POST a blog
router.post("/", createBlog);

// DELETE a blog
router.delete("/:id", deleteBlog);

//UPDATE a blog
router.patch("/:id", updateBlog);

module.exports = router;
