import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';

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

class App extends Component {
  constructor(props) {
    super(props);

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

  getIncButtunList = () => incButtonList;

  render() {
    const { fontSize } = this.state;
    const { fontSizeInc, fontSizeDec } = this;
    const { speed } = this.state;
    const IncButtonComponents = incButtonList.map(bt => (<IncButton
      name={bt.name}
      className={bt.name}
      increase={fontSizeInc}
      decrease={fontSizeDec}
    />
    ));
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
        {IncButtonComponents}
      </div>
    );
  }
}

export default App;
