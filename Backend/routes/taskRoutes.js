const express = require('express'); 
const { getTasks, addTask, updateTaskById, deleteTaskById } = require('../controllers/taskController'); 
const authMiddleware = require('../middlewares/auth'); 
 
const router = express.Router(); 
 
router.get('/', authMiddleware, getTasks); 
router.post('/', authMiddleware, addTask); 
router.put('/:taskId', authMiddleware, updateTaskById); 
router.delete('/:taskId', authMiddleware, deleteTaskById); 
 
module.exports = router; 
