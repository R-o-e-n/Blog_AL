const express = require('express');
const router = express.Router();
const { 
  createComment,
  getCommentsForPost,
  deleteComment
} = require('../controllers/commentController');
const { auth } = require('../middleware/auth');

router.get('/post/:postId', getCommentsForPost);

router.post('/', auth, createComment);
router.delete('/:id', auth, deleteComment);

module.exports = router;