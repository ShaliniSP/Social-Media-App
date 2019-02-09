const User = require('../../models/User');
const Post = require('../../models/Posts');

module.exports = (app) => {
    app.post('/api/act/upload', (req, res, next) => {
        
        const {
            actId,
            timestamp,
            caption,
<<<<<<< HEAD
            category,
=======
>>>>>>> c335cf37bde9ee061c3c1df3038cfc2d971ccf9f
            imgUrl,
        } = req.body;

        console.log(actId, timestamp, caption, imgUrl);

        Post.find({ actId: actId }, (err, posts) => {
            console.log(err, posts);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            } else {
                if (posts.length !== 0) {
                    return res.status(400).send({ 
                        message: 'MF', 
                    });
                }
                
                // Timestamp stamp checking

                // imagUrl Checking

                const newPost = new Post();

                newPost.actId = actId;
                newPost.timestamp = timestamp;
                newPost.caption = caption;
                newPost.imgUrl = imgUrl;
<<<<<<< HEAD
                newPost.category = category;
=======
>>>>>>> c335cf37bde9ee061c3c1df3038cfc2d971ccf9f

                newPost.save((err, post) => {
                    console.log(err, post);
                    if (err) {
                        return res.status(500).send({
                            message: 'Error: Server Error',
                        });
                    } else {
                        return res.sendStatus(202);
                    }
                });
            }
        });        
    });
<<<<<<< HEAD
};
=======
};
>>>>>>> c335cf37bde9ee061c3c1df3038cfc2d971ccf9f
