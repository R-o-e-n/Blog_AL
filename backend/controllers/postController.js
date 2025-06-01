const Post = require('../models/Post');
const upload = require('../utils/fileUpload');

exports.createPost = [
  upload.single('image'), // uploadi i fotos
  async (req, res) => {
    try {
      const { title, content, categories } = req.body;
      
      const post = new Post({
        title,
        content,
        image: req.file ? req.file.filename : null, // ruajtja e fotos
        author: req.user.id,
        categories
      });

      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author categories');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author categories comments');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};