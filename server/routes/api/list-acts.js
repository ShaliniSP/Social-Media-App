const Post = require('../../models/Posts');

module.exports = (app) => {
    app.get('/api/acts/v1/categories/:categoryName/acts', (req, res) => {
        console.log('inside list acts');

        const {
            start,
            end,
        } = req.query;

        const name = req.params.categoryName;

        const builtQuery = start && end ? {
            category: name, 
            isDeleted: false, 
            actId: {
                $gt: start, 
                $lt: end,
            },
        } : {
            category: name, 
            isDeleted: false,
        };

        console.log('ln28', builtQuery);
        
        Post.find(builtQuery, (err, cats) => {
            console.log(cats);
            if (err) {
                console.log('server err');
                return res.status(500).send({
                    message: 'Error:  Server Error',
                });
            }
            else {
                if (cats.length >= 100) {
                    console.log('too big');
                    return res.status(413).send({
                        message: 'Too many Acts',
                    });
                }
                else if (cats.length === 0) {
                    console.log('nothing');
                    return res.status(204).send({
                        message: 'No Acts to show',
                    });
                }
                else {
                    console.log('something');

                    const formattedPosts = cats.map((post) => {
                        return {
                            actId: post.actId,
                            username: post.username,
                            timestamp: post.timestamp,
                            caption: post.caption,
                            upvotes: post.votes,
                            imgB64: post.imgUrl,
                        };
                    });

                    return res.status(200).send(formattedPosts);
                }
            }
        });
    });
};