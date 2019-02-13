const Post = require('../../models/Posts');

function dateTimeStringParser(dateString) {
    // takes DD-MM-YYYY:SS-MM-HH
    // and returns correct date object
    const [ dateDDMMYYYY, time ] = dateString.split(':');

    const [ DD, MM, YYYY ] = dateDDMMYYYY.split('-');

    const [ secs, mins, hours ] = time.split('-');

    const DateString = [YYYY, MM, DD].join('-');

    const TimeString = [hours, mins, secs].join(':');

    const DateTimeString = DateString + 'T' + TimeString;

    return new Date(DateTimeString);
}

module.exports = (app) => {
    app.post('/api/v1/acts', (req, res, next) => {

        const {
            actId,
            timestamp,
            caption,
            categoryName,
            imgB64,
        } = req.body;

        console.log(actId, timestamp, caption, categoryName, imgB64);

        Post.find({ actId: actId }, (err, posts) => {
            console.log(err, posts);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            } else {
                if (posts.length !== 0) {
                    return res.status(400).send({
                        message: 'Bad Request',
                    });
                }

                // timestamp checking



                // imagUrl Checking

                const newPost = new Post();

                newPost.actId = actId;
                newPost.timestamp = timestamp;
                newPost.caption = caption;
                newPost.imgUrl = imgB64;
                newPost.category = categoryName;
                newPost.timestampParsed = dateTimeStringParser(timestamp);

                console.log(dateTimeStringParser(timestamp));

                newPost.save((err, post) => {
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
        });
    });
};
