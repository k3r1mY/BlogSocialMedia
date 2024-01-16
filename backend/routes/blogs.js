const express = require("express");
const Blog = require("../models/blogModel");
const router = express.Router();

// GET all blogs
router.get("/", (req, res) => {
  res.json({ mssg: "I am lesbian" });
  console.log("GET all blogs");
});

// GET a single blog
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single blog" });
});

// POST a blog
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const blog = await Blog.create({ title, content, author });
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a blog
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a blog" });
});

//UPDATE a blog
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a blog" });
});

module.exports = router;
