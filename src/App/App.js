import React, { Component } from 'react';
// import logo from './../logo.svg';
import './App.css';
import AppContainer from './../components/AppContainer/app-container.js';
import LoginAndSignUp from './../components/loginSignupModal/LoginAndSignupModal.js';

class App extends Component {
  render() {
    return (
      <div>
        <LoginAndSignUp />
        <AppContainer />
      </div>
    );
  }
}

export default App;
