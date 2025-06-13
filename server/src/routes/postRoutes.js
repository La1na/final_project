const express = require("express");
const router = express.Router();
const { seedPosts, getAllPosts } = require("../controllers/postController");
const Post = require("../models/Post")
router.post("/seed", seedPosts);
router.get("/", getAllPosts);
router.post("/:id/like", async (req, res) => {

  console.log("----------------in post like route");

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    // ошибка тут он не понимает что такое Пост     что такое Post??????
    console.log("-----------------",post);
    

    if (!post) return res.status(404).json({ message: "Пост не найден" });

    res.json({ likes: post.likes });
  } catch (error) {
    console.error("Ошибка при обновлении лайков:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
module.exports = router;
