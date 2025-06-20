const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth").protect;
const upload = require("../middleware/upload");
const imageController = require("../controllers/Image");

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  imageController.uploadImage
);

router.get("/:imageId", imageController.getImageById);

module.exports = router;
