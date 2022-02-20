const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    beachId: {
        type: mongoose.Types.ObjectId,
        ref: 'Beach'
        // required: true
    },
    thumbnailUrl: {
        type: String
    },
    comments: [{                                                                                                     
        comment: String,
        date: Date
    }]
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);


module.exports = Record;