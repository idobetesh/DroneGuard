const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    beachId: {
        type: mongoose.Types.ObjectId,
        ref: 'Beach'
    },
    records: [{
        recordId: mongoose.Types.ObjectId
    }]
}, { timestamp: true });

const Admin = mongoose.model('Admin', adminSchema);


module.exports = Admin;