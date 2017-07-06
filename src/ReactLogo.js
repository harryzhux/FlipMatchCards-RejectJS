import React, { Component } from 'react';
import logo from './logo.svg';
import './ReactLogo.css';

class ReactLogo extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Flip-Match Card game with React</h2>
      </div>
    );
  }
}

export default ReactLogo;
