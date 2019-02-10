const Category = require('../../models/Categories');
const Post = require('../../models/Posts');

module.exports = (app) => {

    app.get('/api/v1/categories/acts/size', (req,res,next) => {
        const{
            name,
        } = req.body;

        console.log(name)

        Post.count({
            category: name,
            isDeleted: false
        },
        function (err, result){
            console.log(result, err);
            if(err){
                return res.sendStatus(500);
            }
            else{
                if(result==0){
                    return res.sendStatus(204);
                }
                else{
                    console.log('printing result:');
                    console.log(result);
                    return res.sendStatus(200);

                }
                
            }

            
        }
        )






    });
}
