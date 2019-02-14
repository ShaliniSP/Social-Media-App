const Post = require('../../models/Posts');

module.exports = (app) => {
    app.route('/api/v1/acts/upvote')
    .post((req, res) => {
        const {
            actId,
        } = req.body;
        console.log(actId);
        Post.findOne({ actId: actId }, (err, acts) => {
            console.log(acts);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            }
            else {
                if (acts) {
                    //acts.update({ $inc: { "votes": 1}});
                    acts.votes = acts.votes + 1;
                    console.log(acts.votes);
                    acts.save((err, act) => {
                        if (err) {
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
    })
    .all((req, res) => {
        res.status(405).send();
    });
};