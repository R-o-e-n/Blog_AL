const express = require('express');
const router = express.Router();
const { 
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory 
} = require('../controllers/categoriesController');
const { auth, admin } = require('../middleware/auth');

router.get('/', getAllCategories);


router.post('/', auth, admin, createCategory);
router.delete('/:id', auth, admin, deleteCategory);
router.put('/:id',auth, admin, updateCategory);
module.exports = router;