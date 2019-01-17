const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    media: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Media',
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',    
    },
    upvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    downvotes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Post', PostSchema);