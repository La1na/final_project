const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const upload = require("../middleware/upload");

let posts = [];

router.post("/", upload.single("image"), (req, res) => {
  const { description } = req.body;
  const newPost = {
    _id: Date.now().toString(),
    image: `/postsImg/${req.file.filename}`,
    description,
    comments: [],
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const post = posts.find((p) => p._id === req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

router.post("/:id/comments", (req, res) => {
  const post = posts.find((p) => p._id === req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = { text: req.body.text };
  post.comments.push(comment);
  res.status(201).json({ message: "Comment added" });
});

module.exports = router;
