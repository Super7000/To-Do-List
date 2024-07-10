const pool = require('../config/db'); 
 
const getAllTasks = async (userId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM tasks WHERE user_id = ?', [userId]); 
    connection.release()
    return rows; 
}; 
 
const createTask = async (userId, title, description, dueDate) => {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)', [userId, title, description, dueDate]); 
    connection.release()
    return result.insertId; 
}; 
 
const updateTask = async (taskId, title, description, dueDate, completed) => {
    const connection = await pool.getConnection();
    await connection.query('UPDATE tasks SET title = ?, description = ?, due_date = ?, completed = ? WHERE task_id = ?', [title, description, dueDate, completed, taskId]); 
    connection.release()
}; 
 
const deleteTask = async (taskId) => {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM tasks WHERE task_id = ?', [taskId]); 
    connection.release()
}; 
 
module.exports = { getAllTasks, createTask, updateTask, deleteTask }; 
