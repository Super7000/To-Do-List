const pool = require('../config/db');
const moment = require('moment-timezone');

const getAllCategories = async (userId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
    let categoriesObj = rows.map(category => {
        // Convert the datetime from UTC to local timezone
        category.created_at = moment.utc(category.created_at).tz('Asia/kolkata').format('YYYY-MM-DD HH:mm:ss');
        return category;
    });
    connection.release()
    return categoriesObj;
};

const createCategory = async (userId, name) => {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO categories (user_id, name) VALUES (?, ?)', [userId, name]);
    connection.release()
    return result.insertId;
};

const updateCategory = async (category_id, name) => {
    const connection = await pool.getConnection();
    await connection.query('UPDATE categories SET name = ? WHERE category_id = ?', [name, category_id]);
    connection.release()
};

const deleteCategory = async (category_id) => {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM tasks WHERE category_id = ?', [category_id]);
    await connection.query('DELETE FROM categories WHERE category_id = ?', [category_id]);
    connection.release()
};

module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };