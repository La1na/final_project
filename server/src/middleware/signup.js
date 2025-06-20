const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signup = async (req, res) => {
  const { email, password, fullName, username } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email или username уже занят" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      username,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

module.exports = signup;
