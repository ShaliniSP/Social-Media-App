import React, { Component } from 'react';

import './usercontainer.css';
import './../PostContainer/post-container.css';

import ImageUploader from 'react-images-upload';
import { Dropdown, } from 'react-bootstrap';

import postDataService from './../../dataservice/posts-service.js';

import {
    Form,
    Button,
    Card,
    Collapse,
    Alert,
} from 'react-bootstrap';
// import placeholderImg from './../../small_852.jpg';

class UserContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: true,
            actid: '',
            uname: 'san',
            posts: [],
            cats: {},
            pictures: [],
            image: '',
            capton: '',
            category: '',
            isLoading: false,
            alertText: '',
            alertType: 'success',
            alertShow: false,
        };
        this.onDrop = this.onDrop.bind(this);
        this.onChangeCaption = this.onChangeCaption.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toDataURL = this.toDataURL.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            this.setState({
                uname: this.props.user.username,
            });
        }

        postDataService.getAllCats(cats => {
            console.log(cats);

            return this.setState({
                cats,
            });
        });
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
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
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

    onSubmit() {
      this.setState({ isLoading: true });
        this.setState({ open: !this.state.open })
        const payload = {
            actId: Math.floor(Math.random() * 100000 % 10000),
            username: this.state.uname,
            timestamp: '22-78-7876:39:17:75',
            caption: this.state.caption,
            categoryName: this.state.category,
            imgB64: this.state.image,
        };

        postDataService.uploadPost(payload, (resp) => {
            console.log(resp);
        })
        //alert("uploaded");
        this.setState({
          alertText : 'Successfully uploaded',
          alertShow: true,
          alertType: 'success',
          isLoading: false,
        });
        this.setState({
            open: true,
            actid: '',
            uname: '',
            posts: [],
            pictures: [],
            image: '',
            capton: '',
            category: '',
        })

    }
    allCats() {
        return Object.keys(this.state.cats).map((cat => <p key={`categ-${cat}`}>{cat}</p>));
        // return console.log(Object.keys(this.state.cats));
    }

    render() {
        const { isLoading } = this.state;
        return (


            <div className="UserContainer">

                {/* <Button
              className="first"
              variant="info"
              onClick={() => this.setState({ open: !open })}
              aria-controls="example-collapse-text"
              aria-expanded={open}
              block
            >
              +
            </Button> */}

                <Collapse in={this.state.open}>
                    <Card>
                        <Card.Header>Post</Card.Header>
                        <Alert key={'1fdf'} show={this.state.alertShow} variant={this.state.alertType}>
                          {this.state.alertText}
                        </Alert>
                        {this.state.pictures.length !== 0 ?
                            <Card.Img src={this.state.image} className="uploaded"></Card.Img>
                            :
                            <div>

                                <ImageUploader
                                    className="upload-img"
                                    withIcon={true}
                                    buttonText='Upload Image'
                                    onChange={this.onDrop}
                                    imgExtension={['.jpg', '.gif', '.png']}
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
                                    <Form.Control type="text" value={this.state.password} onChange={this.onChangeCaption} />
                                    <Form.Text className="text-muted">
                                        Ex. I feel happy.
                        </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Select Category</Form.Label>
                                    {/* <Form.Control type="text" value={this.state.category} onChange={this.onChangeCategory} />
                                    <Form.Text className="text-muted">
                                        Ex. Animals
                                    </Form.Text> */}
                                    <Dropdown>
                                        <Dropdown.Toggle variant="info" id="dropdown-basic">
                                            {this.state.category.length===0?"Categories":this.state.category}
                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                Object.keys(this.state.cats)
                                                    .map(cat => <Dropdown.Item key={`categ${cat}`} onClick={() => this.setState({
                                                        category: cat,
                                                    })}>{cat}</Dropdown.Item>)
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                                <center>
                                <Button
                                variant="info"
                                disabled={isLoading}
                                onClick={!isLoading ? this.onSubmit : null}
                                >
                                {isLoading ? 'Uploading…' : 'Upload Act'}
                                </Button>

                                </center>

                            </Form>
                        </Card.Body>

                    </Card>
                </Collapse>

            </div>
        );

    }
}

export default UserContainer;
