import React, { Component } from 'react';

import './post-container.css';

import postDataService from './../../dataservice/posts-service.js';
import Post from './../post/post.js';


class PostsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.allPosts = this.allPosts.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        postDataService.getAllPosts(posts => {
            // console.log(posts);
            return this.setState({
                posts,
            });
        });
    }

    allPosts() {
        return this.state.posts.map((post => <Post post={post} key={`post${post._id}`}/>));
    }

    render() {
        return (
            <div className="postsContainer">
                {this.allPosts()}
            </div>
        );
    }
}

export default PostsContainer;