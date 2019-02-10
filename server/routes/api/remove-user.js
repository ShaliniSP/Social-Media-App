const User = require('../../models/User');

module.exports = (app) => {
    //remove user
    app.delete('/api/v1/users/:username', (req, res, next) => {
        const name = req.params.username;

        User.findOne({name: name, isDeleted: false}, (err,user) => {
            if(err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            }

            else {
                if(user != null) {
                    //console.log('user:', user);
                    user.set('isDeleted', true);
                    //console.log(user);
                    user.save((err, post) => {
                        //console.log(err, post);
                        if (err) {
                            return res.status(500).send({
                                message: 'Error: Server Error',
                            });
                        } else {
                            return res.sendStatus(201);
                        }
                    });
                }
                else
                {
                    return res.status(400).send({
                        message: 'Bad Request',
                    });
                }
            }
        })

    })
};