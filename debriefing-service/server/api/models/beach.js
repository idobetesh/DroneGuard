const mongoose = require('mongoose');

const beachSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Beach = mongoose.model('Beach', beachSchema);


module.exports = Beach;
