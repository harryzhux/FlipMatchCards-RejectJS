import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactLogo from './ReactLogo';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactLogo />
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
