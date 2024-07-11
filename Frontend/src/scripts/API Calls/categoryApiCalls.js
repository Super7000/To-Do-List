import { apiUrl } from '../apiUrl.js';

// Function to add a category
const addCategory = async (name, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ name }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Category added successfully');
            successfullFuncCallBack();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const getCategories = async (onErrCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    let categoriesObj = [];
    try {
        const response = await fetch(`${apiUrl}/api/categories`, {
            headers: {
                'authorization': `${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized error (e.g., redirect to login page)
                console.log('Unauthorized access');
                // Example: redirect to login page
                onErrCallBack();
            } else {
                // Handle other HTTP errors
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        categoriesObj = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
    if (categoriesObj) return categoriesObj;
};

// Function to delete a category
const deleteCategory = async (categoryId, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
        });

        if (response.ok) {
            alert('Category deleted successfully');
            successfullFuncCallBack()
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Function to update a category
const updateCategory = async (categoryId, name, successfullFuncCallBack = () => { }) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `${token}`,
            },
            body: JSON.stringify({ name }),
        });

        if (response.ok) {
            alert('Category updated successfully');
            successfullFuncCallBack()
        } else {
            const data = await response.json();
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { addCategory, getCategories, deleteCategory, updateCategory };