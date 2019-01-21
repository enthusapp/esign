import React from 'react';
import ReactDOM from 'react-dom';
import Mover from './Mover';

describe('Mover', () => {
  const targetSpeed = 2000;

  it('renders correctly', () => {
    const container = document.createElement('div');

    ReactDOM.render(
      <Mover
        text="Text"
        backgroundColor="black"
        color="white"
        height="100px"
        direction="scroll-up"
        fontSize={30}
        speed={targetSpeed}
      />,
      container,
    );
  });
});
