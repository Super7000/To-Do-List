import { apiUrl } from '../apiUrl.js';

// Function to get user information
const getUser = async (onErrFunc = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/user`, {
            headers: {
                'authorization': `${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized error (e.g., redirect to login page)
                console.log('Unauthorized access');
                // Example: redirect to login page
                onErrFunc();
            } else {
                // Handle other HTTP errors
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
};

const updateUserDetails = async (name, email, password = '', onErrFunc = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized error (e.g., redirect to login page)
                console.log('Unauthorized access');
                // Example: redirect to login page
                onErrFunc();
            } else {
                // Handle other HTTP errors
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

export { getUser, updateUserDetails };