const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: Date,
    beaches: [{
        type: mongoose.Types.ObjectId,
        ref: 'Beach'
    }],
    userType: {
        type: String,
        enum: ['Admin', 'Lifeguard']
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


module.exports = User;
