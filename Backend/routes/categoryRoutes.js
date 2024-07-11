const express = require('express');
const { getCategories, addCategory, updateCategoryById, deleteCategoryById } = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getCategories);
router.post('/', authMiddleware, addCategory);
router.put('/:categoryId', authMiddleware, updateCategoryById);
router.delete('/:categoryId', authMiddleware, deleteCategoryById);

module.exports = router; 
