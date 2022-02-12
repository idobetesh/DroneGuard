const mongoose = require('mongoose');

const lifeguardSchema = new mongoose.Schema({
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

const Lifeguard = mongoose.model('Lifeguard', lifeguardSchema);


module.exports = Lifeguard;