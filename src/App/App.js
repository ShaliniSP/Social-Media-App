import React, { Component } from 'react';
// import logo from './../logo.svg';
import './App.css';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <Col xs={0} md={4}>
            </Col>
            <Col xs={12} md={4}>
              <Carousel>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/carousel.png" />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/carousel.png" />
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={900} height={500} alt="900x500" src="/carousel.png" />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col xs={0} md={4}>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
