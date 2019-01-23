import React, { Component } from 'react';
import leaf from './leaf.jpg';
import up from './up.jpg';
import dog from './dog.jpg';
import disability from './disability.jpg';
import elderly from './elderly.jpeg';
import environment from './environment.jpeg';
import plants from './plants.jpg';
import './App.css';
//import Rectangle from 'react-shapes';
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

      <center><div className = "page">
        <div className = "header"> 
          <center><h1>SelfieLessActs</h1></center>
        </div>

        <div className = "categories">
          <button className = "button1">Environment</button> 
          <button className = "button1">People</button> 
          <button className = "button1">Animals</button> 
        </div>
        
        <div className = "post">
        <p>@raok303</p>
        <center><img src={dog} alt="Pic" size="100px"/></center><br/>
        <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
        <p><b>raok303</b> Found two cute puppies today, glad I could help them.</p>
        </div><br/>

        <div className = "post">
        <p>@lkjsf</p>
        <center><img src={disability} alt="Pic" size="100px"/></center><br/>
        <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
        <p><b>lkjsf</b> Brought tears to my eyes :')</p>
        </div><br/>

        <div className = "post">
        <p>@randomman</p>
        <center><img src={elderly} alt="Pic" size="100px"/></center><br/>
        <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
        <p><b>randomman</b> Weather at its worst, Humanity at its best</p>
        </div><br/>

        <div className = "post">
        <p>@blah</p>
        <center><img src={environment} alt="Pic" size="100px"/></center><br/>
        <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
        <p><b>blah</b> Keep our city clean!</p>
        </div><br/>

        <div className = "post">
        <p>@halb</p>
        <center><img src={plants} alt="Pic" size="100px"/></center><br/>
        <img src={up} alt="up" size="10px" className= "button" onClick={this.increaseLikes}/><b className="likes">{this.state.likes}</b>
        <p><b>halb</b> Save Earth</p>
        </div><br/>


      </div></center>
      

      //<Rectangle width={100} height={100} fill={{color:'#2409ba'}} stroke={{color:'#E65243'}} strokeWidth={3} />

    );


  }


}


export default App;
