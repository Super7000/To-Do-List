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
                const data = await response.json();
                alert(data.message);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        if (response.status === 200) {
            alert('User details updated successfully');
        }

        return response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

const deleteUser = async (password, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            alert('User details deleted successfully');
            successfullFuncCallBack()
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


export { getUser, updateUserDetails, deleteUser };