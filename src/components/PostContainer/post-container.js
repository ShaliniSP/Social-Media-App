import React, { Component } from 'react';
import './post-container.css';

class PostsContainer extends Component {
    constructor(props, context) {
        super(props, context);

        // this.handleShow = this.handleShow.bind(this);
        // this.handleClose = this.handleClose.bind(this);

        this.state = {

        };
    }

    render() {
        return (
            <div className="post-container" >
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