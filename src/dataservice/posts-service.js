import 'whatwg-fetch';

const RESTAPI = 'http://localhost:8080';

export default {
    // gets posts of a category and return is callback
    getPostsByCategoryName(categoryName, callback) {    
        window.fetch(RESTAPI + '/api/acts/v1/categories/' + categoryName + '/acts')
        .then(response => response.json())
        .then(json => {
            // console.log('getPostsByCategoryNameAPI', json);
            return callback(json);
        });
    },

    // username and password in an object and return is callback
    signup(unameAndPassword, callback) {
        window.fetch(RESTAPI + '/api/account/signin')
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return callback(json);
        });
    },
};