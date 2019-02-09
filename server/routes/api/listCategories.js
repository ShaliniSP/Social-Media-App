const Category = require('../../models/Categories');

//NEED TO CHECK FOR IS DELETED
module.exports = (app) => {
    app.get('/api/v1/categories',  (req, res, next) => {
        Post.getCollection('category').aggregate(
            { $group: 
                {id : '$category', count: {$sum : 1}} 
            },
            function (err, res) {
                if (err) return handleError(err);
                console.log(res);
            }
        )
    });

    app.post('api/v1/categories', (req, res, next) => {

        const {
            name,
        } = req.body;

        console.log(name);
        Category.find({name: name}, (err, categories) => {
            console.log(err, categories);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            } 
            else {
                if(categories.length != 0) {
                    return res.status(400).send({
                        message: 'Bad Request',
                    });
                }

                const newCat = new Category();
                newCat.name = name;

                newCat.save((err, post) => {
                    console.log(err, post);
                    if (err) {
                        return res.status(500).send({
                            message: 'Error: Server Error',
                        });
                    } else {
                        return res.sendStatus(202);
                    }
                });
            }
        });
    });
};

