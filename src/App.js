import React, { Component } from 'react';
import leaf from './leaf.jpg';
import up from './up.jpg';
import down from './down.jpg';
import './App.css';
import Rectangle from 'react-shapes';
import ReactDOM from 'react-dom';

class App extends React.Component {

  constructor(props){

    super(props);
    this.state ={
      likes: 0,
      updated: false
    }
    this.increaseLikes = this.increaseLikes.bind(this);
    //this.decreaseLikes = this.decreaseLikes.bind(this);
  }

  increaseLikes() {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: true
        };
      });
    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: false
        };
      });
    }


  }

  /*decreaseLikes() {

    if(!this.state.updated) {
      this.setState((prevState, props) => {
        return {
          likes: prevState.likes - 1,
          updated: true
        };
      });
    } else {

      this.setState((prevState, props) => {
        return {
          likes: prevState.likes + 1,
          updated: false
        };
      });
    }


  }*/

  render(){

    return(

      <div className= "post">
      <p>  USERNAME </p>
      <img src={leaf} alt="Pic" size="100px"/><br/>
      <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
      </div>

      //<Rectangle width={100} height={100} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />

    );


  }


}


export default App;
