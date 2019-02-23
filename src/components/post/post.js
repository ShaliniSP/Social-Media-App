import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap';

import postDataService from './../../dataservice/posts-service.js';


import './post.css';

import placeholderImg from './../../small_852.jpg';

class Post extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            post: props.post,
        }
        this.deleteFun = this.deleteFun.bind(this);
        this.upvoteFun = this.upvoteFun.bind(this);
    }



    componentDidMount() {
        // console.log(this.props);
    }

    deleteFun() {
        console.log("deleted");
        this.props.onDelete(this.state.post.actId);
    }

    upvoteFun(upvotes) {
        console.log('before:' + this.props.post.upvotes);
        postDataService.upvoteAct(this.state.post.actId, (resp) => {
            console.log(resp);
            this.setState({ post: {
                ...this.state.post,
                upvotes: this.state.post.upvotes + 1,
            } })
        });

        this.setState({
                upvotes: this.state.post.upvotes + 1,
        });

        // this.setState({
        //    this.props.increaseVotes(this.state.post.upvotes);
        // });
        console.log(this.state.post.upvotes);

    }



    render() {
        return (
            <div className="postholder">
                <Card>
                    <Card.Header>
                        <span className="usernamehead"><b>{'@' + this.state.post.username}</b></span>
                        <span className="actidhead"><i>{'#' + this.state.post.actId+':'+this.state.post.category}</i></span>

                    </Card.Header>
                    <Card.Img variant="top" src={placeholderImg}></Card.Img>

                    <Card.Body>
                        <span><Button className="upvotebut" onClick={this.upvoteFun}><b>^</b></Button></span>
                        <span className="upvotecount">{this.state.post.upvotes}</span>
                        <span><Button className="delbut" onClick={this.deleteFun}><b>x</b></Button></span>

                        <Card.Text>
                            {this.state.post.caption}
                        </Card.Text>
                    </Card.Body>

                </Card>
            </div>
        );
    }
};

export default Post;