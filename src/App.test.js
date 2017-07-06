// test React Component redendering

import React from 'react';
import ReactDOM from 'react-dom';

// this is the component to load
import ReactLogo from './ReactLogo';
import Game from './Game';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReactLogo />, div);
  ReactDOM.render(<Game />, div);
});
