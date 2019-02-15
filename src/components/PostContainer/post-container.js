import React, { Component, } from 'react';
import './post-container.css';

import { Dropdown, } from 'react-bootstrap';

import postDataService from './../../dataservice/posts-service.js';
import Post from './../post/post.js';


class PostsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.allPosts = this.allPosts.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {
            posts: [],
            cats: [],
            filter: false,
            filterCat: '',
        };
    }

    componentDidMount() {
        postDataService.getAllPosts(posts => {
            // console.log(posts);
            return this.setState({
                posts,
            });
        });

        postDataService.getAllCats(cats => {
            console.log(cats);

            return this.setState({
                cats,
            });
        });
    }

    allPosts() {
        return this.state.posts.map((post => <Post post={post} key={`post${post._id}`} />));
    }

    render() {
        return (
            <div className="postsContainer">
                <div>   
                    <center><Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Categories
                    </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown></center>
                </div>
                <div>
                    {this.state.posts === 0 ? <p>No posts to show</p> : this.allPosts()}
                </div>
            </div>
        );
    }
}

export default PostsContainer;