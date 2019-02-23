const Category = require('../../models/Categories');
const Post = require('../../models/Posts');

module.exports = (app) => {
    //app.route('/api/v1/categories')
    app.get('/api/v1/categories',(req, res, next) => {
        console.log('inside list categories');

        Post.aggregate(
            [
                { $match: { isDeleted: false } },
                {
                    $group: {
                        _id: '$category',
                        count: {
                            $sum: 1
                        }
                    }
                }
            ],
            function (err, catego) {
                console.log(catego, err);
                if (err) {
                    return res.status(500).send({ message: 'Error: Server Error' });
                }
                else {

                    const formCatego = catego.reduce((acc, cat) => {
                        let name = {
                            ...acc
                        };
                        name[cat._id] = cat.count;
                        return name;
                    }, {});

                    Category.find({ isDeleted: false }, (err, cats) => {
                        if (err) {
                            console.log(err);
                            return res.send(500).status({ "error": "Server Error" });
                        } 
                        else {
                            if(cats.length === 0) {
                                return res.status(204).send();
                            }
                            else {
                            const filledData = cats.reduce((acc, cat) => {
                                let data = { ...acc };
                                if (!formCatego[cat.name]) {
                                    data[cat.name] = 0;
                                    return data;
                                }
                                data[cat.name] = formCatego[cat.name];
                                return data;
                            }, {});
                            console.log(filledData);
                            return res.status(200).send(filledData);
                        }
                        }
                    });
                    //return res.status(200).send(formCatego);
                }
            }
        )
    });

    app.post('/api/v1/categories',(req, res, next) => {

        const {
            name,
        } = req.body;

        console.log(name);
        Category.find({ name: name }, (err, categories) => {
            console.log(err, categories);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            }
            else {
                if(categories.length !== 0) {
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
                        return res.sendStatus(201);
                    }
                });
            }
        });
    })
    /*.all((req, res) => {
        res.status(405).send();
    })*/;

    //app.route('/api/v1/categories/:categoryName')
    app.delete('/api/v1/categories/:categoryName', (req, res, next) => {
        const name = req.params.categoryName;
        console.log(name);
        Category.findOne({ name: name, isDeleted: false }, (err, category) => {
            console.log(err, category);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            }
            else {
                if(category) {
                    console.log('Category:', category);
                    category.set('isDeleted', true);
                    console.log(category);
                    category.save((err, post) => {
                        console.log(err, post);
                        if (err) {
                            return res.status(500).send({
                                message: 'Error: Server Error',
                            });
                        } else {
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
    /*.all((req, res) => {
        res.status(405).send();
    })*/;
};

