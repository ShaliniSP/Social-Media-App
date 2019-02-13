import React, { Component } from 'react';

import { Modal, Tabs, Tab, Button } from 'react-bootstrap';

class LoginAndSignUp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: true,
        };
    }

    handleClose() {
        return this.setState({
            show: false,
        });
    }

    handleShow() {
        return this.setState({
            show: true,
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Body>
                        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                            <Tab eventKey="home" title="Login">
                                LoginComponent
                            </Tab>
                            <Tab eventKey="profile" title="Signup">
                                SignupComponent
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