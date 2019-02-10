const Post = require('../../models/Posts');

module.exports = (app) => {
    app.post('/api/act/upload', (req, res, next) => {

        const {
            actId,
            timestamp,
            caption,
            category,
            imgUrl,
        } = req.body;

        console.log(actId, timestamp, caption, categroy, imgUrl);

        Post.find({ actId: actId }, (err, posts) => {
            console.log(err, posts);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            } else {
                if (posts.length !== 0) {
                    return res.status(400).send({ 
                        message: 'Bad Request', 
                    });
                }
                
                // Timestamp stamp checking

                // imagUrl Checking

                const newPost = new Post();

                newPost.actId = actId;
                newPost.timestamp = timestamp;
                newPost.caption = caption;
                newPost.imgUrl = imgUrl;
                newPost.category = category;

                newPost.save((err, post) => {
                    console.log(err, post);
                    if (err) {
                        return res.status(500).send({
                            message: 'Error: Server Error',
                        });
                    } else {
                        return res.sendStatus(201);
                    }
                });
            }
        });        
    });
};
