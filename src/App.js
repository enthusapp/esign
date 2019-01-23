import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';

const incButtonList = [
  {
    id: 0,
    name: 'fontSize',
    defaultVal: 5,
    lowLimit: 1,
    highLimit: 100,
    reverse: false,
  },
  {
    id: 1,
    name: 'speed',
    defaultVal: 10,
    lowLimit: 1,
    highLimit: 100,
    reverse: true,
  },
];

const playerHeight = 10;

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
        reverse,
      } = bt;

      makeState[name] = defaultVal;

      const increase = () => {
        const { [name]: prev } = this.state;
        this.setState({
          [name]: prev < highLimit - 1 ? prev + 1 : highLimit,
        });
      };

      const decrease = () => {
        const { [name]: prev } = this.state;
        this.setState({
          [name]: prev > lowLimit + 1 ? prev - 1 : lowLimit,
        });
      };

      if (reverse) {
        App.prototype[`${name}Inc`] = decrease;
        App.prototype[`${name}Dec`] = increase;
      } else {
        App.prototype[`${name}Inc`] = increase;
        App.prototype[`${name}Dec`] = decrease;
      }
    });

    this.state = makeState;
  }

  getIncButtunList = () => incButtonList; // TODO: refactoring

  getAnimationList = () => {
    const fontSize = incButtonList[0].defaultVal;
    const heightMiddle = Math.trunc((playerHeight - fontSize) / 2);

    return {
      up: [
        { transform: `translateY(${playerHeight}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(-${playerHeight}rem)` },
      ],
      down: [
        { transform: `translateY(-${playerHeight}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(${playerHeight}rem)` },
      ],
      right: [
        { transform: `translate(-100%, ${heightMiddle}rem)`, offset: 0 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(100%, ${heightMiddle}rem)`, offset: 1 },
      ],
      left: [
        { transform: `translate(100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(-100%, ${heightMiddle}rem)` },
      ],
    };
  }

  render() {
    const playerProps = {
      className: 'player',
      text: 'Text',
      backgroundColor: 'black',
      color: 'white',
      height: String(playerHeight),
      direction: 'left',
      animation: this.getAnimationList().right,
    };

    incButtonList.forEach((bt) => {
      const { name } = bt;
      const { [name]: btState } = this.state;
      playerProps[name] = btState;
    });

    const IncButtonComponents = incButtonList.map(bt => (<IncButton
      key={bt.id}
      name={bt.name}
      className={bt.name}
      increase={App.prototype[`${bt.name}Inc`]}
      decrease={App.prototype[`${bt.name}Dec`]}
    />
    ));

    return (
      <div className="App">
        <Player
          {...playerProps}
        />
        {IncButtonComponents}
      </div>
    );
  }
}

export default App;
