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

  increaseFontSize = () => {
    this.setState(
      ({ fontSize }) => ({
        fontSize: fontSize < 101 ? fontSize + 1 : 100,
      }),
    );
  }

  decreaseFontSize = () => {
    this.setState(
      ({ fontSize }) => ({
        fontSize: fontSize > 2 ? fontSize - 1 : 1,
      }),
    );
  }

  render() {
    const { increaseFontSize, decreaseFontSize } = this;
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
          name="Font Size"
          className="btIncFontSize"
          increase={increaseFontSize}
          decrease={decreaseFontSize}
        />
      </div>
    );
  }
}

export default App;
