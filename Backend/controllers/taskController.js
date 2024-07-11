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
