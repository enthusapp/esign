import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';

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
        <IncButton
          className="btIncFontSize"
          increase={increase}
          decrease={decrease}
        />
      </div>
    );
  }
}

export default App;
