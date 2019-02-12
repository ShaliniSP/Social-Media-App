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
    app.post('/api/act/upload', (req, res, next) => {

        const {
            actId,
            timestamp,
            caption,
            category,
            imgUrl,
        } = req.body;

        console.log(actId, timestamp, caption, category, imgUrl);

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
                newPost.imgUrl = imgUrl;
                newPost.category = category;
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
