const Category = require('../../models/Categories');
const Post = require('../../models/Posts');

module.exports = (app) => {
    app.get('/api/acts/v1/categories/:categoryName\/acts', (req, res) => {
        console.log('inside list acts');

        const name = req.params.categoryName;
        Post.findAll({category : name, isDeleted : false}, (err, cat) => {
            if(err) {
                console.log('server err');
                return res.status(500).send({
                    message: 'Error:  Server Error',
                });
            }

            else {
                if(cat.length > 500) {
                    console.log('too big');
                    return res.status(413).send({
                        message: 'Too many Acts',
                    });
                }
                else if(cat.length == 0) {
                    console.log('nothing');
                    return res.status(204).send({
                        message: 'No Acts to show',
                    });
                }
                else {
                    console.log('something');
                    return sendStatus(200);
                }
            }
        });
        console.log(Out);
    });
};