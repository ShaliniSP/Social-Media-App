import React, { Component } from 'react';

import { Card, Button } from 'react-bootstrap';

import './post.css';

import placeholderImg from './../../small_852.jpg';

class Post extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            post: props.post,
        }
    }

    componentDidMount() {
        // console.log(this.props);
    }

    render() {
        return (
            <div className="postholder">
                <Card>
                    <Card.Header>
                        <span className="usernamehead"><b>{'@'+this.state.post.username }</b></span>
                        <span className="actidhead"><i>{'#'+this.state.post.actId }</i></span>
                    
                    </Card.Header>
                    <Card.Img variant="top" src={placeholderImg}></Card.Img>

                    <Card.Body>
                        <Button className>
                            {'^' + this.state.post.upvotes}
                        </Button>
                        {this.state.upvotes}
                        <Card.Text>
                            {this.state.post.username+': '+this.state.post.caption}
                        </Card.Text>
                    </Card.Body>

                </Card>
            </div>
        );
    }
};

export default Post;