const bcrypt = require('bcrypt');
const { getUserById, updateUserDetails } = require('../models/userModel');

const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.user.userId);
        user.Password = undefined;
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.user;
    const { name, email, password } = req.body;

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
    if (!nameRegex.test(name.trim())) {
        return res.status(400).json({ message: 'Invalid username format' });
    }

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        await updateUserDetails(name, email, userId);
        res.json({ message: 'User details updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getUser, updateUser }; 
