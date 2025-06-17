// const MyPost = require('../models/Post');


// exports.getPostById = async (req, res) => {
//   try {
//     const post = await MyPost.findById(req.params.postId);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };


// exports.addComment = async (req, res) => {
//   try {
//     const { text } = req.body;
//     console.log("-----------text: ", text);
//         console.log("-----------req.params.postId: ", req.params.postId);
//     const post = await MyPost.findById(req.params.postId);
//     console.log("-----------post: ", post);
//     if (!post) return res.status(404).json({ error: 'Post not found' });
   
//     post.comments.push({ text });
//     await post.save();

//     res.status(201).json({ message: 'Comment added' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

const Post = require('../models/Post');
const User = require('../models/User');

// Создание нового поста
exports.createPost = async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    const userId = req.user._id;

    if (!imageUrl || !caption) {
      return res.status(400).json({ message: 'Image URL and caption are required.' });
    }

    const newPost = new Post({
      imageUrl,
      caption,
      user: userId,
      likes: 0,
      comments: []
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: 'Post created successfully!',
      post: savedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post.', error: error.message });
  }
};

// Получение всех постов (или постов текущего пользователя)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
                               .populate('user', 'username')
                               .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to retrieve posts.', error: error.message });
  }
};

// Получение одного поста по ID (для модального окна)
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
                            .populate('user', 'username')
                            .populate('comments.user', 'username');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error('Error in getPostById:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.addCommentToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required.' });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({ text, user: userId, createdAt: new Date() });
    await post.save();

    const savedPost = await Post.findById(postId).populate('comments.user', 'username');
    const newCommentWithUser = savedPost.comments[savedPost.comments.length - 1];

    res.status(201).json({ message: 'Comment added successfully!', comment: newCommentWithUser });
  } catch (error) {
    console.error('Error adding comment to post:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getCommentsForPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).select('comments').populate('comments.user', 'username');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ comments: post.comments });
  } catch (error) {
    console.error('Error fetching comments for post:', error);
    res.status(500).json({ message: 'Failed to retrieve comments.', error: error.message });
  }
};


