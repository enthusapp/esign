import React, { Component } from 'react';
import Player from './components/Player';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: 30,
    };
  }

  increase = () => {
    this.setState(({ fontSize }) => ({ fontSize: fontSize + 1 }));
  }

  decrease = () => {
    this.setState(({ fontSize }) => ({ fontSize: fontSize - 1 }));
  }

  render() {
    const { increase, decrease } = this;
    const { fontSize } = this.state;
    const buttonStyle = {
      height: '100px',
      width: '100px',
      margin: '10px',
      fontSize: '30px',
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
          fontSize={fontSize}
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
