const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  comments: [String],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);

