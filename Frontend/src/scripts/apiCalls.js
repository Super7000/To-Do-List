const apiUrl = 'http://localhost:5000'; // Replace with your API URL

// Function to handle login
const login = async (email, password, successfullFuncCallBack = () => { }) => {
    try {
        const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            alert('Login successful');
            successfullFuncCallBack()
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to handle registration
const register = async (username, email, password) => {
    try {
        const response = await fetch(`${apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful');
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export default register
export { login, addTask, getTasks }

// Function to add a task
const addTask = async (title, description, dueDate) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description, dueDate }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Task added successfully');
            getTasks(); // Refresh the task list
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to get tasks
const getTasks = async () => {
    const token = localStorage.getItem('token');
    let tasksObj = [];
    try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
            headers: {
                'Authorization': `${token}`,
            },
        });

        tasksObj = await response.json();
        console.log(tasks)
    } catch (error) {
        console.error('Error:', error);
    }
    if (tasksObj) return tasksObj
};