import React, { Component } from 'react';

import {
    Form,
    Button,
} from 'react-bootstrap';

class LoginComp extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            show: true,
            email: '',
            password: '',
        }
    }

    onSubmit() {
        console.log(this.state);
    }

    onChangeEmail(event) {
        
        return this.setState({
            email: event.currentTarget.value,
        });
    }

    onChangePassword(event) {
        
        return this.setState({
            password: event.currentTarget.value,
        });
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                </Form.Group>
                <Button variant="primary" onClick={this.onSubmit}>
                    Submit
                </Button>
            </Form>            
        );
    }
}

export default LoginComp;