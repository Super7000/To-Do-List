const express = require('express');
const { getTasks, addTask, updateTaskById, deleteTaskById } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getTasks); // get all tasks
router.post('/', authMiddleware, addTask); // add a new task
router.put('/:taskId', authMiddleware, updateTaskById); // update a task
router.delete('/:taskId', authMiddleware, deleteTaskById); // delete a task

module.exports = router; 
