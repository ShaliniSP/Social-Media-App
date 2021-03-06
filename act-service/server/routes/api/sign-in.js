const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    // SignUp
    // app.post('/api/account/signup', (req, res, next) => {
    //     const body = req.body;
    //     console.log(body);

    //     const {
    //         password,
    //     } = body;

    //     const {
    //         name,
    //     } = body;

    //     let {
    //         email,
    //     } = body;

    //     if (!email) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Email cannot be blank.'
    //         });
    //     }
    //     if (!password) {
    //         return res.send({
    //             success: false,
    //             message: 'Error: Password cannot be blank.'
    //         });
    //     }

    //     email = email.toLowerCase();
    //     email = email.trim();

    //     User.find(
    //         {
    //             email: email,
    //         },
    //         (err, prevUsers) => {
    //             // console.log(prevUsers);
    //             if (err) {
    //                 return res.status(500).send({
    //                     message: 'Error: Server Error',
    //                 });
    //             }
    //             else if (prevUsers.length !== 0) {
    //                 return res.status(200).send({
    //                     message: 'Error: Account Already Exists'
    //                 })
    //             }
    //             else {
    //                 const newUser = new User();

    //                 newUser.email = email;
    //                 newUser.password = newUser.generateHash(password);
    //                 newUser.name = name;
    //                 // console.log(newUser.password);
    //                 newUser.save((err, user) => {
    //                     if (err) {
    //                         return res.status(500).send({
    //                             message: err,
    //                         });
    //                     }
    //                     else {
    //                         return res.status(200).send({
    //                             message: "Signed Up",
    //                         });
    //                     }

    //                 });
    //             }
    //         });
    // });

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;

        const {
            password
        } = body;

        let {
            username,
        } = body;

        if (!username) {
            return res.status(300).send({
                message: 'Error: Uname cannot be blank.',
                respId: 'LIE1'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error Password cannot be blank.',
                respId: 'LIE2',
            });
        }

        username = username.toLowerCase();
        username = username.trim();

        User.find({
            username,
        }, (err, users) => {
            if (err) {
                console.log('err2:', err);
                return res.send({
                    success: false,
                    message: 'Error: server error',
                    respId: 'LIE3',
                });
            }

            if (users.length !== 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid',
                    respId: 'LIE4',
                });
            } else {
                const user = users[0];
                //console.log(password, user.password);
                if (user.password !== password) {
                    return res.send({
                        success: false,
                        message: 'Error: Wrong Email or Password',
                        respId: 'LIE5',
                    });
                } else {
                    const userSession = new UserSession();
                    userSession.userId = user._id;
                    userSession.save((err, doc) => {
                        if (err) {
                            console.log(err);
                            return res.send({
                                success: false,
                                message: 'Error: Server Error',
                                respId: 'LIE6',
                            });
                        } else {
                            return res.send({
                                success: true,
                                message: 'Valid sign in',
                                token: doc._id,
                                name: user.name,
                                respId: 'LIS',
                            });
                        }

                    });
                }
            }



        });

    });

    app.get('/api/account/logout', (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false,
        }, {
                $set: {
                    isDeleted: true,
                }
            }, null, (err, sessions) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: 'Error: Server Error',
                    });
                } else {
                    return res.send({
                        success: true,
                        message: 'Logged Out',
                    });
                }
            });

    });

    app.get('/api/account/verify', (req, res, next) => {
        // Get the token
        const { query } = req;
        const { token } = query;
        // ?token=test
        // Verify the token is one of a kind and it's not deleted.
        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            if (sessions.length !== 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                // DO ACTION
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
        });
    });

    //app.route('/api/v1/users')
        app.post('/api/v1/users', (req, res, next) => {
            let {
                username,
                password,
            } = req.body;

            if (!username || !password) {

                return res.status(500).send({
                  message: 'Username or Password cannot be empty.',
                });
            }

            username = username.toLowerCase().trim();
            
            // Checking if the password is an SHA1 string
            const sha1RegExp = new RegExp('^[0-9a-f]{40}$');

            if (!sha1RegExp.test(password)) {
                console.log('SHA1 failed');
                return res.status(400).send({
                  message: 'SHA1 failed',
                });
            }

            User.find({ username }, (err, user) => {
                if (err) {
                    return res.status(500).send({
                      message: 'Error: Server Error',
                    });
                }

                if (user.length !== 0) {
                    return res.status(400).send({
                      message: 'Error: Bad request',
                    });
                }

                const newUser = new User();

                newUser.username = username;
                newUser.password = password;

                newUser.save((error, newUser) => {
                    if (error) {
                        console.log(error, newUser);
                        return res.status(400).send({
                          message: 'Error: Bad request',
                        });
                    }
                    return res.status(201).send({
                      message: 'SignedUp Successfully',
                    });
                });
            });
        })
        /*.all((req, res) => {
            res.status(405).send();
        })*/;
};
