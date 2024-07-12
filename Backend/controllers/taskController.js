const { getAllTasks, createTask, updateTask, deleteTask, getAllTasksByCategoryId } = require('../models/taskModel');

const getTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks(req.user.userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasksByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const tasks = await getAllTasksByCategoryId(req.user.userId, categoryId)
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const addTask = async (req, res) => {
    const { category_id, title, description, dueDate } = req.body;

    if (!category_id || !title || !description || !dueDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Additional checks or verifications for the variables
    if (typeof category_id !== 'number' || category_id <= 0) {
        return res.status(400).json({ message: 'Invalid category_id' });
    }
    if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Invalid title' });
    }
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ message: 'Invalid description' });
    }
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ message: 'Invalid dueDate' });
    }

    try {
        const taskId = await createTask(req.user.userId, category_id, title, description, dueDate);
        res.status(201).json({ taskId });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTaskById = async (req, res) => {
    const { taskId } = req.params;
    const { title, description, dueDate, completed } = req.body;

    if (!title && !description && !dueDate && completed === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    // Additional checks or verifications for the variables
    if (title && (typeof title !== 'string' || title.trim() === '')) {
        return res.status(400).json({ message: 'Invalid title' });
    }
    if (description && (typeof description !== 'string' || description.trim() === '')) {
        return res.status(400).json({ message: 'Invalid description' });
    }
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ message: 'Invalid dueDate' });
    }
    if (completed == undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'Invalid completed' });
    }

    try {
        await updateTask(taskId, title, description, dueDate, completed);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTaskById = async (req, res) => {
    const { taskId } = req.params;
    try {
        await deleteTask(taskId);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, getTasksByCategoryId, addTask, updateTaskById, deleteTaskById }; 
