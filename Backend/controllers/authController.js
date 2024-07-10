const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const { getUserByEmail, createUser } = require('../models/userModel'); 
 
const register = async (req, res) => {
    const { username, email, password } = req.body; 
    try { 
        const existingUser = await getUserByEmail(email); 
        if (existingUser) { 
            return res.status(400).json({ message: 'User already exists' }); 
        } 
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userId = await createUser(username, email, hashedPassword); 
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.status(201).json({ token }); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error' }); 
    } 
}; 
 
const login = async (req, res) => {
    const { email, password } = req.body; 
    try { 
        const user = await getUserByEmail(email); 
        if (!user) { 
            return res.status(400).json({ message: 'Invalid credentials' }); 
        } 
        const isMatch = await bcrypt.compare(password, user.Password); 
        if (!isMatch) { 
            return res.status(400).json({ message: 'Invalid credentials' }); 
        } 
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.json({ token }); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error' }); 
    } 
}; 
 
module.exports = { register, login }; 
