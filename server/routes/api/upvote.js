const Post = require('../../models/Posts');

module.exports = (app) => {
    app.post('/api/v1/acts/upvote', (req, res) => {
        const {
            actId : actId,
        } = req.body;
        Post.findOne({actId:actId}, (err, acts) =>{
            if(err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            }
            else {
                if(acts != undefined) {
                    //acts.update({ $inc: { "votes": 1}});
                    acts.votes = acts.votes +1;
                    console.log(acts.votes);
                    acts.save((err, act) =>{
                        if(err) {
                            return res.status(500).send({
                                message: 'Error: Server Error',
                            });
                        }
                        else {
                            return res.sendStatus(200);
                        }
                    });
                }
                else {
                    return res.status(400).send({
                        message: 'Bad Request',
                    });
                }
            }
        });
    });
};