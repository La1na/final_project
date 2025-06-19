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
  } catch (err) {
    res.status(401).json({ msg: "in notification controller" });
  }
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { username, website, about } = req.body;

  console.log(`PUT request to update user ID: ${id}`);
  console.log("Received data for update:", { username, website, about });

  try {
    const updateFields = {};
    if (username !== undefined) updateFields.username = username;
    if (website !== undefined) updateFields.website = website;
    if (about !== undefined) updateFields.about = about;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log(`User not found for ID: ${id}`);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User updated successfully:", updatedUser);
    res
      .status(200)
      .json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `The ${field} '${error.keyValue[field]}' is already taken.`,
      });
    }
    res
      .status(500)
      .json({
        message: "Server error while updating profile.",
        error: error.message,
      });
  }
};

module.exports = {
  seedUsers,
  getAllUsers,
  searchUsers,
  notification,
  updateUserProfile,
};
