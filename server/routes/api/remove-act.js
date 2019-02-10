const Post = require('../../models/Posts');

module.exports = (app) => {

    app.delete('/api/v1/acts/:actid', (req,res) => {
        const actId = req.params.actid;

        Post.findOne({actId : actId, isDeleted : false}, (err,post) => {
            if(err) {
                return res.sendStatus(500);
            }
            else {
                console.log(post);
                if(post != undefined) {
                    post.set('isDeleted', true);
                    post.save((err, post) => {
                        if (err) {
                            return res.sendStatus(500);
                        } else {
                            return res.sendStatus(200);
                        }
                    });
                }
                else
                {
                    return res.sendStatus(400);
                }
            }
        })
    })
};