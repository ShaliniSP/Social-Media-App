const User = require('../../models/User');

module.exports = (app) => {
    //remove user
    //app.route('/api/v1/users/:username')
    app.delete('/api/v1/users/:username',(req, res, next) => {
        const name = req.params.username;
        //console.log(name);
        User.findOne({username: name, isDeleted: false}, (err,user) => {
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
        });
    })
    /*.all((req, res) => {
        res.status(405).send();
    })*/;
};