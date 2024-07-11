const pool = require('../config/db.js');

const getUserByEmail = async (email) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM User_Details WHERE Email = ?', [email]);
    connection.release()
    return rows[0];
};

const createUser = async (username, email, hashedPassword) => {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO User_Details (Username, Email, Password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    connection.release()
    return result.insertId;
};

const getUserById = async (userId) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT ID, Username, Email, Created_At FROM User_Details WHERE ID = ?', [userId]);
    connection.release();
    return rows[0];
};

module.exports = { getUserByEmail, createUser, getUserById }; 
