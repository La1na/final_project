exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const serverBaseUrl = `${req.protocol}://${req.get("host")}`;
    const relativeUploadPath = process.env.UPLOAD_DIR || "uploads";
    const imageUrl = `${serverBaseUrl}/${relativeUploadPath}/${req.file.filename}`;

    res.status(200).json({
      message: "Image uploaded successfully!",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res
      .status(500)
      .json({ message: "Failed to upload image.", error: error.message });
  }
};

exports.getImageById = (req, res) => {
  res
    .status(501)
    .json({
      message: `getImageById for ${req.params.imageId} not implemented. Images are served statically.`,
    });
};
