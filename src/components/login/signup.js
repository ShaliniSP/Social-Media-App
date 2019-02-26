import React, { Component } from 'react';

import './login.css';

import postDataService from './../../dataservice/posts-service.js'


import {
    Form,
    Button,
} from 'react-bootstrap';

var sha1 = require('sha1');

class SignupComp extends Component {
    constructor(props, context) {
        super(props, context);

        this.onSubmit = this.onSubmit.bind(this);

        this.onChangeUname = this.onChangeUname.bind(this);

        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            show: true,
            uname: '',
            password: '',
        }
    }

    onSubmit() {
        postDataService.signup({
          username: this.state.uname,
          password: sha1(this.state.password),
          },(resp) => {
            console.log(resp);
            if(resp["message"] === "SignedUp Successfully"){
              alert("Successfully signed up.")
            }
            if(resp["message"] === "Username or Password cannot be empty."){
              alert("Please fill all fields.")
            }
            else{
              alert(resp["message"])
            }
            document.cookie = 'token=' + resp.token;
          })
        }

    onChangeUname(event) {

        return this.setState({
            uname: event.currentTarget.value,
        });
    }

    onChangePassword(event) {

        return this.setState({
            password: event.currentTarget.value,
        });
    }

    render() {
        return (
            <Form className='form'>
                <Form.Group controlId="formBasicEmailSignup">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter User Name" value={this.state.uname} onChange={this.onChangeUname}/>
                    <Form.Text className="text-muted">
                        Ex. John
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordSignup">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                </Form.Group>
                <center><Button variant="info" block onClick={this.onSubmit} className='submitbutton'>
                    Submit
                </Button></center>
            </Form>
        );
    }
}

export default SignupComp;
