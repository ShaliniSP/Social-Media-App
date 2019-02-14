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
    login(unameAndPassword, callback) {
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
        window.fetch(RESTAPI + '/api/v1/acts')
        .then(resp => {
            if (resp.status === 200) {
                return resp.json();
            } else {
                return [];
            }
        })
        .then(json => {
            console.log('getAllPostsResponse', json);
            return callback(json);
        });
    },

    getAllCats(callback) {
        window.fetch(RESTAPI + '/api/v1/categories')
        .then((resp => {
            if (resp.status === 200) {
                return resp.json();
            } else if (resp.status === 204) {
                return [];
            } else {
                return [];
            }
        }))
        .then(json => callback(json));
    },

    uploadPost(post, callback) {
        window.fetch(RESTAPI + '/api/v1/acts',{
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        })
        .then(response => {
            if (response.status === 200) {
                return callback(true);
            }                
            return callback(false);
        });
    },
};
