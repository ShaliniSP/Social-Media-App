import React, { Component, } from 'react';
import './post-container.css';

import { Dropdown, } from 'react-bootstrap';
import { DropDownList } from '@progress/kendo-react-dropdowns';

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
        return this.state.posts.map((post => <Post post={post} key={`post${post._id}`} onDelete={this.delActId} />));
    }

    allCats() {
        // return Object.keys(this.state.cat).map((cat => <Dropdown.Item >{cat}</Dropdown.Item>));
        //return console.log("Categories: "+Object.keys(this.state.cats).length);
        for (var index in this.state.cats) {
            return index;
        }
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
                    {/* <center><Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic" >
                            Categories
                    </Dropdown.Toggle>

                        
                    </Dropdown></center>
                    <center>
                        <select>
                            {(this.state.cat).map((cats) => <option key={cats.value} value={cats.value}>{cats.display}</option>)}
                        </select>
                    </center> */}
                    <DropDownList>
                        {this.state.cats}
                    </DropDownList>
                </div>
                <div>
                    {this.state.posts.length === 0 ? <center><p className="errormsg">No posts to show</p> </center> : this.allPosts()}
                </div>
            </div>
        );
    }
}

export default PostsContainer;