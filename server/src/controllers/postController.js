const Post = require("../models/Post");
const User = require("../models/User");

const seedPosts = async (req, res) => {
  try {
    await Post.deleteMany();

    const user = await User.findOne({ username: "sasha" });
    const commentAuthor = await User.findOne({ username: "alex" });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found for post seeding" });
    }

    console.log("----------user._id", user._id);

    const posts = await Post.insertMany([
      {
        imageUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        caption: "It's golden, Ponyboy!",
        username: user._id,
        likes: 101824,
        comments: [
          { username: commentAuthor._id, text: "heyyy" },
          { username: commentAuthor._id, text: "Awesome shot!" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1528825871115-3581a5387919",
        caption: "Blossom time.",
        username: user._id,
        likes: 70678,
        comments: [
          { username: commentAuthor._id, text: "Spring vibes!" },
          { username: commentAuthor._id, text: "Lovely shot" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        caption: "Road to adventure.",
        username: user._id,
        likes: 81200,
        comments: [
          { username: commentAuthor._id, text: "Where is this?" },
          { username: commentAuthor._id, text: "Want to go!" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        caption: "Lost in the clouds.",
        username: user._id,
        likes: 97844,
        comments: [
          { username: commentAuthor._id, text: "So peaceful" },
          { username: commentAuthor._id, text: "Love the sky" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
        caption: "Nature always wears the colors of the spirit.",
        username: user._id,
        likes: 88321,
        comments: [
          { username: commentAuthor._id, text: "Stunning view!" },
          { username: commentAuthor._id, text: "So calming " },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        caption: "Evening reflections.",
        username: user._id,
        likes: 67988,
        comments: [
          { username: commentAuthor._id, text: "Love the symmetry!" },
          { username: commentAuthor._id, text: "Mesmerizing colors" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1531177071257-ea2635f3c4a7",
        caption: "Wander often, wonder always.",
        username: user._id,
        likes: 72350,
        comments: [
          { username: commentAuthor._id, text: "Bucket list location" },
          { username: commentAuthor._id, text: "Magical" },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        caption: "Through the woods.",
        username: user._id,
        likes: 61520,
        comments: [
          { username: commentAuthor._id, text: "Feels like a fairytale!" },
          { username: commentAuthor._id, text: "Can almost smell the trees " },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
        caption: "Above it all.",
        username: user._id,
        likes: 89010,
        comments: [
          { username: commentAuthor._id, text: "Incredible view!" },
          { username: commentAuthor._id, text: "Flying dreams " },
        ],
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        caption: "Desert dreams.",
        username: user._id,
        likes: 74225,
        comments: [
          { username: commentAuthor._id, text: "So warm and golden!" },
          { username: commentAuthor._id, text: "Love this place" },
        ],
      },
    ]);

    res.status(201).json(posts);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Failed to seed posts", error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("username");
    console.log("------posts: ", posts);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

module.exports = {
  seedPosts,
  getAllPosts,
};
