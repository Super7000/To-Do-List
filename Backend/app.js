const express = require('express'); 
const bodyParser = require('body-parser'); 
const authRoutes = require('./routes/authRoutes'); 
const taskRoutes = require('./routes/taskRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');
require('dotenv').config(); 
const path = require('path');
 
const app = express(); 
app.use(bodyParser.json()); 
 
app.use('/api/tasks', taskRoutes); 
app.use('/api/user', userRoutes); 
app.use('/api/auth', authRoutes); 
app.use(cors());


//server code for the react app
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
}); 
