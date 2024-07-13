function verifyFieldsForLogIn(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === '' || password === '') {
        alert('Fields cannot be empty');
        return false;
    }

    if (!emailRegex.test(email.trim())) {
        alert('Invalid email format');
        return false;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }
    return true;
}

function verifyFieldsForSignUp(email, password, confirmPassword, firstName, lastName) {
    const emailAndPassverficationStatus = verifyFieldsForLogIn(email, password);
    if (!emailAndPassverficationStatus) return false;
    const nameRegex = /^[a-zA-Z]+$/;

    if (confirmPassword !== password) {
        alert('Passwords do not match');
        return false;
    }
    if (firstName.trim() === '' || lastName.trim() === '') {
        alert('Name cannot be empty');
        return false;
    }
    if (!nameRegex.test(firstName.trim()) || !nameRegex.test(lastName.trim())) {
        alert('Name can only contain alphabets');
        return false;
    }
    return true;
}

export { verifyFieldsForLogIn, verifyFieldsForSignUp}