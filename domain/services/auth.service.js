//auth.service.js
// filepath: /home/taller4M/backend_ah/src/domain/services/auth.service.js
const User = require('../models/user.model');
const db = require('../../infrastructure/config/database');

const registerUser = async (userData) => {
    const { name, email, password, phone } = userData;
    const user = new User(name, email, password, phone);
    
    // Validate user data
    const validationErrors = user.validate();
    if (validationErrors.length > 0) {
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
}

    // Save user to the database
    const connection = await db.connect();
    const result = await connection.query('INSERT INTO users SET ?', user);
    return result.insertId;
};

const authenticateUser = async (email, password) => {
    const connection = await db.connect();
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || !user.comparePassword(password)) {
        throw new Error('Invalid email or password');
    }

    return user;
};

module.exports = {
    registerUser,
    authenticateUser,
};