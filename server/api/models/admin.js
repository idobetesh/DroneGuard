const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
}, { timestamp: true });

const Admin = mongoose.model('Admin', adminSchema);


module.exports = Admin;