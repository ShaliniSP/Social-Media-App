const Post = require('../../models/Posts');

module.exports = (app) => {
    //app.route('/api/v1/categories/:categoryName/acts')
    app.get('/api/v1/categories/:categoryName/acts', (req, res) => {

        const {
            start,
            end,
        } = req.query;

        const name = req.params.categoryName;

        const builtQuery = start && end ? {
            category: name, 
            isDeleted: false, 
            actId: {
                $gte: start, 
                $lte: end,
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
        }).sort({timestampParsed: -1});
    })
    /*.all((req, res) => {
        res.status(405).send();
    })*/;
};