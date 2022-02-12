const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: Date,
    userType: {
        type: String,
        enum: ['Lifeguard', 'Admin']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


module.exports = User;