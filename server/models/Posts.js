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
        type: [mongoose.Schema.Types.ObjectId],
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
    timeStamp: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: String,
        default: 'All',
    },
    username: {
        type: String,
        default: 'John Doe',
    },
    caption: {
        type: String,
        default: '',
    },
    actId: {
        type: Number,
        default: 0,
    },
    imgUrl: {
        type: String,
        default: '',
    },
    timestamp: {
        type: String,
        default: Date.now(),
    },
    timestampParsed: {
        type: Date,
        default: Date.now(),
    },
    votes: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
        
});

module.exports = mongoose.model('Post', PostSchema);
