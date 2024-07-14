const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/userModel');
const envVariables = require('../config/config.js');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (email.trim() === '' || password === '') {
        return res.status(400).json({ message: 'Fields cannot be empty' });
    }
    if (!nameRegex.test(username.trim())) {
        return res.status(400).json({ message: 'Invalid username format' });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await createUser(username, email, hashedPassword);
        const token = jwt.sign({ userId }, envVariables.jwtSecret, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (email.trim() === '' || password === '') {
        return res.status(400).json({ message: 'Fields cannot be empty' });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'No account is found with this email' });
        }
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.ID }, envVariables.jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login }; 