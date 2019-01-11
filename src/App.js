import React, { Component } from 'react';
import Player from './components/Player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 30,
    };
  }

  increase = () => {
    this.setState(({ number }) => ({ number: number + 1 }));
  }

  decrease = () => {
    this.setState(({ number }) => ({ number: number - 1 }));
  }

  render() {
    const { increase, decrease } = this;
    const { number } = this.state;
    const buttonStyle = {
      height: '100px',
      width: '100px',
      margin: '10px',
    };
    return (
      <div className="App">
        <Player
          className="player"
          text="Text"
          backgroundColor="black"
          color="white"
          height="100px"
          direction="scroll-up"
          fontSize={number}
        />
        <button
          className="btIncFontSize"
          type="button"
          onClick={increase}
          style={buttonStyle}
        >
          {'+'}
        </button>
        <button
          className="btDecFontSize"
          type="button"
          onClick={decrease}
          style={buttonStyle}
        >
          {'-'}
        </button>
      </div>
    );
  }
}

export default App;
