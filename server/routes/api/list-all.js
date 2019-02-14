const Post = require('../../models/Posts');

module.exports = (app) => {
    app.get('/api/v1/acts', (req, res) => {
        console.log('inside list all');

        Post.find({isDeleted:false}, (err, posts) => {
            console.log(posts);
            if (err) {
                console.log('server err');
                return res.status(500).send({
                    message: 'Error:  Server Error',
                });
            }
            else
            {
                if(posts.length === 0) {
                    return res.status(204).send({
                        message: 'No Posts to show',
                    });
                }
                else {
                    const formattedPosts = posts.map((post) => {
                        return {
                            actId: post.actId,
                            username: post.username,
                            timestamp: post.timestamp,
                            caption: post.caption,
                            upvotes: post.votes,
                            imgB64: post.imgUrl,
                            category: post.category,
                        };
                    });
                    return res.status(200).send(formattedPosts);
                }
            }
        }).sort({timestamp:-1});
    });
};
