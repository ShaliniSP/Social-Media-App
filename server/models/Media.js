const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    timestamp: {
        type: Date,
        default: Date.now(),        
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
});

module.exports = mongoose.model('Media', MediaSchema);