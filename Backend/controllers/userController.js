const { getUserById } = require('../models/userModel'); 
 
const getUser = async (req, res) => {
    try { 
        const user = await getUserById(req.user.userId); 
        res.json(user); 
    } catch (error) { 
        res.status(500).json({ message: 'Server error' }); 
    } 
}; 
 
module.exports = { getUser }; 
