// src/controllers/Image.js

exports.uploadImage = (req, res) => {
  // Заглушка для логики загрузки изображения
  res.json({ msg: 'Image uploaded successfully (not implemented yet)' });
};

exports.getImageById = (req, res) => {
  // Заглушка для получения изображения по ID
  res.send(`Image with ID: ${req.params.imageId} (not implemented yet)`);
};
