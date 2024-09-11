const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Register Schema
const registerSchema = new mongoose.Schema({
    userName: {
        type: String, 
        trim: true,
        required: true  // Ensure the user provides a username
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true  // Ensure the user provides an email
    },
    role: {
        type: String,
        trim: true,
        enum: ['manager', 'sales-agent'],  // Restrict roles to 'manager' or 'sales-agent'
        required: true  // Ensure the user selects a role
    },
    branch: {
        type: String,
        trim: true,
        required: true  // Ensure the user selects a branch
    }
});

// Add passport-local-mongoose plugin
registerSchema.plugin(passportLocalMongoose, {
    usernameField: 'email',  // Use email instead of username for login
    errorMessages: {
        MissingPasswordError: 'Password is required',
        MissingUsernameError: 'Email is required',
        UserExistsError: 'A user with that email already exists'
    }
});

module.exports = mongoose.model('Register', registerSchema);
