const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../models/categoryModel');

const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories(req.user.userId);
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const categoryId = await createCategory(req.user.userId, name);
        res.status(201).json({ categoryId });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;
    try {
        await updateCategory(categoryId, name);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    try {
        await deleteCategory(categoryId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getCategories, addCategory, updateCategoryById, deleteCategoryById };