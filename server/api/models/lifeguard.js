const mongoose = require('mongoose');

const lifeguardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Lifeguard = mongoose.model('Lifeguard', lifeguardSchema);


module.exports = Lifeguard;