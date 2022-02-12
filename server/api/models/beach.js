const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamp: true });

const Beach = mongoose.model('Beach', beachSchema);


module.exports = Beach;