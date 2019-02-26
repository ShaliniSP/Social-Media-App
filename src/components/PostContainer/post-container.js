import React, { Component, } from 'react';
import './post-container.css';

import { Dropdown, } from 'react-bootstrap';

import postDataService from './../../dataservice/posts-service.js';
import Post from './../post/post.js';


class PostsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.allPosts = this.allPosts.bind(this);
        this.delActId = this.delActId.bind(this);
        this.removePost = this.removePost.bind(this);
        this.allCats = this.allCats.bind(this);


        this.state = {
            posts: [],
            cats: {},
            filter: false,
            filterCat: 'category_xyz',
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
        const filteredPosts = this.state.filter ? 
        this.state.posts.filter(post => post.category === this.state.filterCat) 
        : this.state.posts;
        return filteredPosts.map((post => <Post post={post} key={`post${post._id}`} onDelete={this.delActId} />));
    }

    allCats() {
        return Object.keys(this.state.cats).map((cat => <p key={`categ-${cat}`}>{cat}</p>));
        // return console.log(Object.keys(this.state.cats));
    }

    delActId(actId) {
        postDataService.deletePost(actId, (resp) => {
            console.log(resp);
        });
        this.setState({
            posts: this.state.posts.filter(post => post.actId !== actId)
        });
        console.log(this.state);
    }

    removePost() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="postsContainer">
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                            Categories
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item key={`categ${'clear'}`}>{'Clear'}</Dropdown.Item>
                            {
                                Object.keys(this.state.cats)
                                .map(cat => <Dropdown.Item key={`categ${cat}`}>{cat}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
                <div>
                    {this.state.posts.length === 0 ? <center><p className="erroemsg">No posts to show</p> </center> : this.allPosts()}
                </div>
            </div>
        );
    }
}

export default PostsContainer;