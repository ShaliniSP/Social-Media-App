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
          show: true,
          uname: '',
          password: '',
      }
  }

  onSubmit() {
      const astate = this;
      console.log(this.state);
      console.log(sha1(this.state.password));
      postDataService.signin({
        username: this.state.uname,
        password: sha1(this.state.password),
        },(resp) => {
          console.log(resp);
          document.cookie = 'token=' + resp.token;
          return astate.setState({
            show: false,
          });
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
                <Form.Group controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter User Name" value={this.state.uname} onChange={this.onChangeUname}/>
                <Form.Text className="text-muted">
                    Ex. John
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
                </Form.Group>
                <Button variant="info" block onClick={this.onSubmit}>
                    Login
                </Button>
            </Form>
        );
    }
}

export default LoginComp;
