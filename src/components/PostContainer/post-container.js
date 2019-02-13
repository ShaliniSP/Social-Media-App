import React, { Component } from 'react';

import postDataService from './../../dataservice/posts-service.js';

class PostsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        postDataService.getPostsByCategoryName('All', posts => {
            console.log(posts);
            return this.setState({
                posts,
            });
        });
    }

    render() {
        return (
            <div>
            <h1>
                Hello World!
            </h1>
            <h1>
                Hello World!
        </h1>
            <h1>
                Hello World!
    </h1>
            <h1>
                Hello World!
</h1></div>
        );
    }
}

export default PostsContainer;