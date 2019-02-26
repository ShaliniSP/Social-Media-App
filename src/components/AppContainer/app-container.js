import React, { Component } from 'react';
import './app-container.css';
import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';

import PostsContainer from './../PostContainer/post-container.js';

import UserContainer from './../User-container/usercontainer.js';

import LoginAndSignUp from './../loginSignupModal/LoginAndSignupModal.js';

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.onTabbarSelect = this.onTabbarSelect.bind(this);
        this.uploadPost = this.uploadPost.bind(this);
        this.loginButt = this.loginButt.bind(this);
        this.modalClose = this.modalClose.bind(this);

        this.state = {
            tabbarKey: 1,
            showPostView: true,
            modalState: true,
        }
    }

    onTabbarSelect(k) {
        return this.setState({ tabbarKey: k });
    }

    uploadPost() {
        return this.setState({
            showPostView: !this.state.showPostView,
        })
    }

    loginButt() {
        return this.setState({
            modalState: true,
        });
    }

    modalClose() {
        return this.setState({
            modalState: false,
        });
    }

    render() {
        return (
            <div>

                <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" fixed="top">
                    <Navbar.Text className="nav-brand" href="#home" ><h1>SlActs</h1></Navbar.Text>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link href="#login" className="loginbut" onClick = {this.loginButt}>Login</Nav.Link>
                            <Nav.Link href="#upload" className="uploadbut" onClick = {this.uploadPost}>{this.state.showPostView?'Upload':'Acts'}</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>


                <Container className="post-cont">
                    <Row>
                        <Col xs={0} md={3}>
                        </Col>
                        <Col xs={12} md={6}>
                            {this.state.showPostView?<PostsContainer />:<UserContainer />}
                        </Col>
                        <Col xs={0} md={3}>
                        </Col>
                    </Row>
                </Container>

                <LoginAndSignUp 
                    modalState = {this.state.modalState}
                    onModalClose = {this.modalClose}
                />

            </div>
        );
    }
}

export default AppContainer;
