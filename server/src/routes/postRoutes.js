const express = require("express");
const router = express.Router();
const multer = require("multer");
const { seedPosts, getAllPosts } = require("../controllers/postController");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

router.post("/seed", seedPosts);

router.get("/", getAllPosts);

router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Пост не найден" });

    res.json({ likes: post.likes });
  } catch (error) {
    console.error("Ошибка при обновлении лайков:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "postsImg/"),
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("selectedFile"), async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("token: ", token);
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;

    const post = new Post();

    post.caption = req.body.caption;
    post.imageUrl = `http://localhost:3000/uploads/${req.file.originalname}`;
    post.username = userId;
    post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: "authorization denied" });
  }
});

module.exports = router;
