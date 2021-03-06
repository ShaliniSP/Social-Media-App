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
    //app.route('/api/v1/acts')
    app.post('/api/v1/acts', (req, res, next) => {

        const {
            actId,
            username,
            timestamp,
            caption,
            categoryName,
            imgB64,
        } = req.body;

        // console.log(actId, timestamp, caption, categoryName, imgB64);

        Post.find({ actId: actId }, (err, posts) => {
            // console.log(err, posts);
            if (err) {
                return res.status(500).send({
                    message: 'Error: Server Error',
                });
            } else {
                if (posts.length !== 0) {
                    console.log('Failing here');
                    return res.status(400).send({
                        message: 'Bad Request',
                    });
                }

                // timestamp checking

                const parsedTimeStamp = dateTimeStringParser(timestamp);

                // console.log('parsedTimeStamp:', isNaN(parsedTimeStamp));


                // imagUrl Checking

                const newPost = new Post();

                newPost.actId = actId;
                newPost.timestamp = timestamp;
                newPost.caption = caption;
                newPost.imgUrl = imgB64;
                newPost.username = username;
                newPost.category = categoryName;
                newPost.timestampParsed = isNaN(parsedTimeStamp) ? undefined : parsedTimeStamp;
                newPost.username = username;

                // console.log(dateTimeStringParser(timestamp));

                newPost.save((err, post) => {
                    // console.log(err, post);
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
    })
    /*.all((req, res) => {
        res.status(406).send();
    })*/;
};
