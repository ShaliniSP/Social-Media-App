import React, { Component } from 'react';

import { Modal, Tabs, Tab, Button } from 'react-bootstrap';

import LoginComp from './../login/login.js';

import SignupComp from './../login/signup.js';

class LoginAndSignUp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: props.modalState,
        };
    }

    handleClose() {
        this.setState({
            show: false,
        });
        return this.props.onModalClose();
    }

    handleShow() {
        return this.setState({
            show: true,
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.modalState} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Login or Signup on SlActs
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Login">
                                <LoginComp onLogin={this.props.onLogin} />
                            </Tab>
                            <Tab eventKey="profile" title="Signup">
                                <SignupComp />
                            </Tab>
                        </Tabs>
                        <Button variant="link" size="sm" onClick={this.handleClose}>
                            Maybe later
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default LoginAndSignUp;
