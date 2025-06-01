const Comment = require('../models/Comment');


exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: postId,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [{ author: req.user.id }, { post: { $in: req.user.posts } }] // Owner or admin
    });
    if (!comment) return res.status(404).json({ error: 'Comment not found or unauthorized' });
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};