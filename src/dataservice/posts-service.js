import 'whatwg-fetch';

import constants from './../consts';

const RESTAPI = constants.RESTAPIURL;

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
    signin(unameAndPassword, callback) {
        window.fetch(RESTAPI + '/api/account/signin',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(unameAndPassword),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return callback(json);
        });
    },

    signup(unameAndPassword, callback) {
        window.fetch(RESTAPI + '/api/v1/users',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(unameAndPassword),
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            return callback(json);
        });
    },

    getAllPosts(callback) {
        fetch(RESTAPI + '/api/v1/acts')
        .then(resp => resp.json())
        .then(json => {
            console.log('getAllPostsResponse', json);
            return callback(json);
        });
    },
};
