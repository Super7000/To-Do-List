import { apiUrl } from '../apiUrl.js';

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
const register = async (username, email, password, onSuccess = () => { }) => {
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
            onSuccess()
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { login, register };