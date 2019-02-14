import React, { Component } from 'react';
import './app-container.css';
import { Navbar, Container, Row, Col, ButtonGroup, Button, Nav } from 'react-bootstrap';

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
                <Container>
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


                <Navbar bg="dark" fixed="bottom">
                    <div>
                    <Nav fill variant="pills" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/home">Active</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="link-2">Link</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" disabled>
                                Disabled
                        </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default AppContainer;