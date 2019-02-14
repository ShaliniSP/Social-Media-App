import React, { Component } from 'react';
import './app-container.css';
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';

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
                <Navbar bg="info" variant="dark" expand="true" fixed="top">
                    <Navbar.Text className="nav-brand" href="#home" ><h1>SlActs</h1></Navbar.Text>
                    <Button variant="outline-light">Login</Button>
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