import React, { Component } from 'react';
import './app-container.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import * as bs from 'bootstrap/dist/css/bootstrap.css';
import * as bst from 'bootstrap/dist/css/bootstrap-theme.css';

import PostsContainer from './../PostContainer/post-container.js';

class AppContainer extends Component {
    render() {
        return (
            <div>
                <Navbar className={bs["nav"]} expand="true" fixed="top">
                    <Navbar.Brand href="#home" ><h1>SlActs</h1></Navbar.Brand>
                    <Button variant="outline-light">Login</Button>
                </Navbar>

                <PostsContainer/>


            </div >
        );
    }
}

export default AppContainer;