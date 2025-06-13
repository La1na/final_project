const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { forgotPassword } = require("../controllers/User");

const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({ email: usernameOrEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("login middleware: ",user);
    console.log("login middleware: ",password);
    console.log("login middleware: ", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

     const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    res.json({ token }); 
  } catch (error) {
    res.status(500).json({ message: "Server error in login middleware" });
  }
};

module.exports = login;
