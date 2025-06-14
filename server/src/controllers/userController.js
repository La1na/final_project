const User = require("../models/User");
const jwt = require("jsonwebtoken");

const seedUsers = async (req, res) => {
  try {
    await User.deleteMany();

    const users = await User.insertMany([
      {
        username: "sasha",
        avatar: "https://i.pravatar.cc/150?img=12",
        email: "sasha@example.com",
      },
      {
        username: "alex",
        avatar: "https://i.pravatar.cc/150?img=34",
        email: "alex@example.com",
      },
    ]);

    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to seed users", error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
const searchUsers = async (req, res) => {
  const { q } = req.query;
  console.log("-----------------------1111", q);
  // сюда даже не доходит

  if (!q) return res.status(400).json({ message: "Search query is required" });

  console.log("-----------------------", q);

  try {
    const users = await User.find({
      username: { $regex: q, $options: "i" },
    }).limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};

const notification = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("token: ", token);
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded: ", decoded);
    const userId = decoded.userId;
    console.log("userId: ", userId);
    const user = await User.findOne({
      _id: userId,
    });

    console.log("user: ", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = user.notifications;
    console.log("result: ", result);

    return res.status(200).json({ result });

    // req.user = decoded;
    // next();
  } catch (err) {
    res.status(401).json({ msg: "in notification controller" });
  }
};

module.exports = {
  seedUsers,
  getAllUsers,
  searchUsers,
  notification,
};
