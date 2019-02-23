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


function oldtoDataURL(url, callback) {
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

function toDataURL(url, callback) {
        var fileToLoad = url;
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
            callback(fileLoadedEvent.target.result);
        };
        fileReader.readAsDataURL(fileToLoad);
}


class UserContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false,
            uname: '' ,
            posts: [],
            pictures: [],
            image: '',
            capton: '',
            category: '',
        };
        this.onDrop = this.onDrop.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
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

    onChangeCategory(event) {

        return this.setState({
            category: event.currentTarget.value,
        });
    }

    onSubmit() {
      const astate = this;
      toDataURL(this.state.pictures[0], function(dataUrl) {
        console.log('RESULT:', dataUrl);
        astate.setState({
            image: dataUrl,
        });
      })


      const timestampnow = Date.now();
      console.log(new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit',year: 'numeric',second: '2-digit',minute: '2-digit', hour: '2-digit'}).format(timestampnow));
      postDataService.upload({
        //actid: ,
        username: this.state.uname,
        timestamp: timestampnow,
        caption: this.state.caption,
        categoryName: this.state.category,
        imgB64: this.state.image ,
        },(resp) => {
          console.log(resp);
        })

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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter Category</Form.Label>
                        <Form.Control type="text" value={this.state.category} onChange={this.onChangeCategory}/>
                        <Form.Text className="text-muted">
                            Ex. Animals
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