const Post = require('../models/Post');
const User = require('../models/User');

const seedPosts = async (req, res) => {
  try {
    await Post.deleteMany();

    const user = await User.findOne({ username: 'sasha' });

    if (!user) {
      return res.status(404).json({ message: 'User not found for post seeding' });
    }

    const posts = await Post.insertMany([
        {
        imageUrl: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
        caption: "It's golden, Ponyboy!",
        user: user._id,
        likes: 101824,
        comments: [{ username: 'john_doe', text: 'heyyy' }, { username: 'jane_smith', text: 'Awesome shot!' }] 
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919',
        caption: "Blossom time.",
        user: user._id,
        likes: 70678,
        comments: [{ username: 'alice_w', text: 'Spring vibes!' }, { username: 'bob_m', text: 'Lovely shot' }] 
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
        caption: "Road to adventure.",
        user: user._id,
        likes: 81200,
        comments: [{ username: 'traveler_g', text: 'Where is this?' }, { username: 'explorer_x', text: 'Want to go!' }] 
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
        caption: "Lost in the clouds.",
        user: user._id,
        likes: 97844,
        comments: [{ username: 'sky_lover', text: 'So peaceful' }, { username: 'cloud_watcher', text: 'Love the sky' }] 
      },
    ]);

    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to seed posts', error });
  }
};

const getAllPosts = async (req, res) => {
  try {
  
    const posts = await Post.find().populate('user');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};



module.exports = {
  seedPosts,
  getAllPosts,
};
