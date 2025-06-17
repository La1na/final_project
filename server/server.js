const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const uploadDir = path.join(__dirname, process.env.UPLOAD_DIR || 'postsImg');
app.use('/uploads', express.static(uploadDir));

app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is running!" });
});

app.use("/api/auth", require("./src/routes/auth"));

app.use("/api/posts", require("./src/routes/postRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));

app.use("/api/my-posts", require("./src/routes/myPostRoutes"));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
