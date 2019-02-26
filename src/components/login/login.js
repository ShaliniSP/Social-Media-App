import React, { Component } from 'react';

import './login.css';

import postDataService from './../../dataservice/posts-service.js'

import {
    Form,
    Button,
} from 'react-bootstrap';

var sha1 = require('sha1');

class LoginComp extends Component {
  constructor(props, context) {
      super(props, context);

      this.onSubmit = this.onSubmit.bind(this);

      this.onChangeUname = this.onChangeUname.bind(this);

      this.onChangePassword = this.onChangePassword.bind(this);

      this.state = {
          show: false,
          uname: '',
          password: '',
      }
  }

  onSubmit() {

      postDataService.login({
        username: this.state.uname,
        password: sha1(this.state.password),
        },(resp) => {

          if(resp["message"] === "Valid sign in")
          {
            alert("Successfully logged in.")
          }

          if(resp["message"] === "Error: Invalid"){
            alert("Please enter correct username.")
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
                <Form.Group controlId="formBasicEmailLogin">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" value={this.state.uname} onChange={this.onChangeUname}/>
                <Form.Text className="text-muted">
                    Ex. John
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPasswordLogin">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                </Form.Group>
                <center><Button variant="info" block onClick={this.onSubmit} className="submitbutton">
                    Login
                </Button></center>
            </Form>
        );
    }
}

export default LoginComp;
