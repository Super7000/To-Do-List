const express = require('express');
const { getTasks, addTask, updateTaskById, deleteTaskById, getTasksByCategoryId } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getTasks); // get all tasks
router.post('/', authMiddleware, addTask); // add a new task
router.put('/:taskId', authMiddleware, updateTaskById); // update a task
router.delete('/:taskId', authMiddleware, deleteTaskById); // delete a task
router.get('/category/:categoryId', authMiddleware, getTasksByCategoryId); // get all tasks by category id

module.exports = router; 
