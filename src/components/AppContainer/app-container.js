import React, { Component } from 'react';
import './app-container.css';
import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';

import PostsContainer from './../PostContainer/post-container.js';

class AppContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.onTabbarSelect = this.onTabbarSelect.bind(this);

        this.state = {
            tabbarKey: 1,
        }
    }

    onTabbarSelect(k) {
        return this.setState({ tabbarKey: k });
    }

    render() {
        return (
            <div>

                <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
                    <Navbar.Text className="nav-brand" href="#home" ><h1>SlActs</h1></Navbar.Text>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            <Nav.Link href="#login" className="loginbut">Login</Nav.Link>
                            <Nav.Link href="#upload" className="uploadbut">Upload</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>


                <Container className="post-cont">
                    <Row>
                        <Col xs={0} md={3}>
                        </Col>
                        <Col xs={12} md={6}>
                            <PostsContainer />
                        </Col>
                        <Col xs={0} md={3}>
                        </Col>
                    </Row>
                </Container>



            </div>
        );
    }
}

export default AppContainer;