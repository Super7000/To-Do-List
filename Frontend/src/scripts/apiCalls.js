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
            localStorage.setItem('logedIn', 'true');
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
const addTask = async (title, description, dueDate, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ title, description, dueDate }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Task added successfully');
            // getTasks(); // Refresh the task list
            successfullFuncCallBack()
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to get tasks
const getTasks = async (onErrCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    let tasksObj = [];
    try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
            headers: {
                'authorization': `${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized error (e.g., redirect to login page)
                console.log('Unauthorized access');
                // Example: redirect to login page
                onErrCallBack()
            } else {
                // Handle other HTTP errors
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        tasksObj = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    if (tasksObj) return tasksObj
};

// Function to delete a task
const deleteTask = async (taskId, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
        });

        if (response.ok) {
            alert('Task deleted successfully');
            successfullFuncCallBack()
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { deleteTask };