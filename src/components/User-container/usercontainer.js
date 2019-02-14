import React, { Component } from 'react';

import './usercontainer.css';
import ImageUploader from 'react-images-upload';
import postDataService from './../../dataservice/posts-service.js';
import Post from './../post/post.js';

import {
    Form,
    Button,
    Card,
    Collapse,

} from 'react-bootstrap';
import placeholderImg from './../../small_852.jpg';

import base64Img from 'base64-img'

var data = '';

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

class UserContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            posts: [],
            pictures: [],
            image: '',
            capton: '',
        };
        this.onDrop = this.onDrop.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    onChangeCaption(event) {

        return this.setState({
            caption: event.currentTarget.value,
        });
    }

    onSubmit() {
      toDataURL(this.state.pictures[0].name, function(dataUrl) {
  console.log('RESULT:', dataUrl)
})
      //base64Img.base64(this.state.pictures[0].name, function(err, data) {})
      //var data = base64Img.base64Sync(this.state.pictures[0].name);
      this.setState({
          image: data,
      });
      console.log(this.state);
    }

    render() {
        const { open } = this.state;
        return (

          <div className="UserContainer">
          <p> </p>
          <>
            <Button
              className="first"
              variant="info"
              onClick={() => this.setState({ open: !open })}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              block
            >
              Create new Post
            </Button>

            <Collapse in={this.state.open}>
            <Card>
                <Card.Header>

                </Card.Header>

                <Card.Body>
                <Form className='form'>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Choose Image
                    </Form.Label>
                    <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Caption</Form.Label>
                        <Form.Control type="text" value={this.state.password} onChange={this.onChangeCaption}/>
                        <Form.Text className="text-muted">
                            Ex. I feel happy.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="info" block onClick={this.onSubmit}>
                        Upload
                    </Button>
                </Form>
                </Card.Body>

            </Card>
            </Collapse>
          </>
          </div>
        );

    }
}

export default UserContainer;
