import { apiUrl } from '../apiUrl.js';

// Function to add a task
const addTask = async (category_id, title, description, dueDate, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ category_id, title, description, dueDate }),
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

const getTasksByCategoryId = async (categoryId, onErrCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    let tasksObj = [];
    try {
        const response = await fetch(`${apiUrl}/api/tasks/category/${categoryId}`, {
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

// Function to update a task
const updateTask = async (taskId, title, description, dueDate, completed, successfullFuncCallBack = () => { }, showAlert = true) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ title, description, dueDate, completed }),
        });

        if (response.ok) {
            showAlert ? alert('Task updated successfully') : "";
            successfullFuncCallBack()
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { addTask, getTasksByCategoryId, deleteTask, updateTask };