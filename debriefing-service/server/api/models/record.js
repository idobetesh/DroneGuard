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
    beach: {
        type: String,
        enum: ['Yamit',
            'Poleg',
            'Hasharon',
            'Gordon',
            'Frishman',
            'Nitzanim',
            'Dugit'
        ],
        default: 'Frishman'
        // required: true
    },
    thumbnailUrl: {
        type: String
    },
    note: {
        type: String
    }
}, { timestamps: true });

const Record = mongoose.model('Record', recordSchema);


module.exports = Record;
