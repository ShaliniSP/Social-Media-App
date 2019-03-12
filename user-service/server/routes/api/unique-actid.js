const Post = require('../../models/Posts');

module.exports = (app) => {
    app.route('api/v1/getId')
    .get((res) =>{
        //NOT DONE YET
        Post.find();
    })
    .all((req, res) => {
        res.status(405).send();
    });
};