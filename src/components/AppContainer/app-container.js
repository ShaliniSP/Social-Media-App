import React, { Component } from 'react';
import './app-container.css';
import { Navbar } from 'react-bootstrap';

import PostsContainer from './../PostContainer/post-container.js';

class AppContainer extends Component {
    render() {
        return (
            <div>
                <Navbar bg="light" fixed="top">
                    <Navbar.Brand align="center">
                        <span className="navbar-brand-name">
                            Slacts
                        </span>
                        <span className="navbar-brand-sub">
                            - selfies of acts worth sharing
                        </span>
                    </Navbar.Brand>
                </Navbar>
        
                <PostsContainer />

                <Navbar bg="dark" fixed="bottom">
                    <Navbar.Brand href="#home">
                        <span>
                            Brand link
                        </span>
                    </Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default AppContainer;