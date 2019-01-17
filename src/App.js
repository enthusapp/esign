import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';

class App extends Component {
  constructor(props) {
    super(props);

    const incButtonList = [
      {
        name: 'fontSize',
        defaultVal: 30,
        lowLimit: 1,
        highLimit: 100,
      },
      {
        name: 'speed',
        defaultVal: 30,
        lowLimit: 1,
        highLimit: 100,
      },
    ];

    const makeState = {};

    incButtonList.forEach((bt) => {
      const {
        name,
        defaultVal,
        lowLimit,
        highLimit,
      } = bt;

      makeState[name] = defaultVal;

      App.prototype[`${name}Inc`] = () => {
        const { [name]: prev } = this.state;

        this.setState({
          [name]: prev < highLimit + 1 ? prev + 1 : highLimit,
        });
      };

      App.prototype[`${name}Dec`] = () => {
        const { [name]: prev } = this.state;

        this.setState({
          [name]: prev > lowLimit + 1 ? prev - 1 : lowLimit,
        });
      };
    });

    this.state = makeState;
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

  increaseSpeed = () => {
    this.setState(
      ({ speed }) => ({
        speed: speed < 101 ? speed + 1 : 100,
      }),
    );
  }

  decreaseSpeed = () => {
    this.setState(
      ({ speed }) => ({
        speed: speed > 2 ? speed - 1 : 1,
      }),
    );
  }

  render() {
    const { fontSize } = this.state;
    const { increaseSpeed, decreaseSpeed } = this;
    const { fontSizeInc, fontSizeDec } = this;
    const { speed } = this.state;
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
          speed={speed}
        />
        <IncButton
          name="Font Size"
          className="btIncFontSize"
          increase={fontSizeInc}
          decrease={fontSizeDec}
        />
        <IncButton
          name="Speed"
          className="btSpeed"
          increase={increaseSpeed}
          decrease={decreaseSpeed}
        />
      </div>
    );
  }
}

export default App;
