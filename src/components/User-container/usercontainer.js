import React, { Component } from 'react';

import './usercontainer.css';
import ImageUploader from 'react-images-upload';
import postDataService from './../../dataservice/posts-service.js';
// import Post from './../post/post.js';

import {
    Form,
    Button,
    Card,
    Collapse,
} from 'react-bootstrap';
// import placeholderImg from './../../small_852.jpg';


// function oldtoDataURL(url, callback) {
//   var xhr = new XMLHttpRequest();
//   xhr.onload = function() {
//     var reader = new FileReader();
//     reader.onloadend = function() {
//       callback(reader.result);
//     }
//     reader.readAsDataURL(xhr.response);
//   };
//   xhr.open('GET', url);
//   xhr.responseType = 'blob';
//   xhr.send();
// }


class UserContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: true,
            actid: '',
            uname: 'san' ,
            posts: [],
            pictures: [],
            image: '',
            capton: '',
            category: '',
        };
        this.onDrop = this.onDrop.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeActid = this.onChangeActid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toDataURL = this.toDataURL.bind(this);
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

        this.toDataURL(picture[0], result => {
            return this.setState({
              image: result,
            });
        });
    }

    toDataURL(url, callback) {
            var fileToLoad = url;
            //console.log(url);
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent)
            {
                callback(fileLoadedEvent.target.result);
            };
            fileReader.readAsDataURL(fileToLoad);
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

    onChangeActid(event) {


        return this.setState({
            actid: event.currentTarget.value,
        });
    }

    onSubmit() {
      // const astate = this;
      // this.toDataURL(this.state.pictures[0], function(dataUrl) {
      //   console.log('RESULT:', dataUrl);
      //   astate.setState({
      //       image: dataUrl,
      //   });
      // })
      this.setState({ open: !open })
      const payload = {
        actId: Math.floor(Math.random() * 100000 % 10000),
        username: this.state.uname,
        timestamp: '22-78-7876:39:17:75',
        caption: this.state.caption,
        categoryName: this.state.category,
        imgB64: this.state.image ,
        //imgB64: 'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvb',
        };
      const timestampnow = Date.now();
      //Date.format(timestampnow, 'DD/MM/YYYY:ss-mm-HH');
      //console.log(new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit',year: 'numeric',second: '2-digit',minute: '2-digit', hour: '2-digit'}).format(timestampnow));
      postDataService.uploadPost(payload,(resp) => {
          console.log(resp);
        })
        alert("uploaded");
         this.setState({
            open: false,
            actid: '',
            uname: '' ,
            posts: [],
            pictures: [],
            image: '',
            capton: '',
            category: '',
        })

    }

    render() {
        const { open } = this.state;
        return (


          <div className="UserContainer">
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
                <p className="text-muted">Click to expand </p>

                { this.state.pictures.length !==0 ?
                  <Card.Img src={this.state.image} className="uploaded"></Card.Img>
                  :
                  <div>
                  <Form.Label>
                    Choose Image
                  </Form.Label>
                  <ImageUploader
                      className="upload-img"
                      withIcon={true}
                      buttonText='Choose image'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                  />
                  </div>

              }

                <Card.Body>
                <Form className='form'>
                    <Form.Group controlId="formBasicEmail">



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

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Enter ActId</Form.Label>
                        <Form.Control type="text" value={this.state.actid} onChange={this.onChangeActid}/>
                        <Form.Text className="text-muted">
                            Ex. 25
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
