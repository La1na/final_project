// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   imageUrl: { type: String, required: true },
//   caption: { type: String },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   likes: { type: Number, default: 0 },
//   comments: [],
// }, { timestamps: true });

// module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  username: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  comments: [commentSchema], 
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);