import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';
import DirectionButton from './components/DirectionButton';

const DEFAULT_PLAYER_HEIGHT = 10;
const DEFAULT_FONT_SIZE = 5;

class App extends Component {
  constructor(props) {
    super(props);

    const makeState = {
      currentAnimation: this.getAnimationList().up,
      direction: 'up',
    };

    this.getIncButtunList().forEach((bt) => {
      const {
        name,
        defaultVal,
        lowLimit,
        highLimit,
        reverse,
      } = bt;

      makeState[name] = defaultVal;

      const increase = () => {
        const { [name]: prev, direction } = this.state;
        const newValue = prev < highLimit - 1 ? prev + 1 : highLimit;
        this.setState({
          [name]: newValue,
        });
        if (name === 'fontSize') {
          this.setState({
            currentAnimation: this.getAnimationList(newValue)[direction],
          });
        }
      };

      const decrease = () => {
        const { [name]: prev, direction } = this.state;
        const newValue = prev > lowLimit + 1 ? prev - 1 : lowLimit;
        this.setState({
          [name]: newValue,
        });
        if (name === 'fontSize') {
          this.setState({
            currentAnimation: this.getAnimationList(newValue)[direction],
          });
        }
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

  getDefaultPlayerHeight = () => DEFAULT_PLAYER_HEIGHT;

  getIncButtunList = () => [
    {
      id: 0,
      name: 'fontSize',
      defaultVal: DEFAULT_FONT_SIZE,
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

  getAnimationList = (fontSize = DEFAULT_FONT_SIZE) => {
    const heightMiddle = (DEFAULT_PLAYER_HEIGHT - fontSize) / 2;

    return {
      up: [
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      down: [
        { transform: `translateY(-${DEFAULT_PLAYER_HEIGHT}rem)` },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translateY(${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translateY(${DEFAULT_PLAYER_HEIGHT}rem)` },
      ],
      right: [
        { transform: `translate(-100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(100%, ${heightMiddle}rem)` },
      ],
      left: [
        { transform: `translate(100%, ${heightMiddle}rem)` },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.3 },
        { transform: `translate(0%, ${heightMiddle}rem)`, offset: 0.6 },
        { transform: `translate(-100%, ${heightMiddle}rem)` },
      ],
    };
  }

  directionChange = (event) => {
    const { fontSize } = this.state;

    this.setState({ direction: event.target.value });
    this.setState({
      currentAnimation: this.getAnimationList(fontSize)[event.target.value],
    });
  };

  render() {
    const { currentAnimation, direction } = this.state;
    const playerProps = {
      className: 'player',
      text: 'Text',
      backgroundColor: 'black',
      color: 'white',
      height: String(DEFAULT_PLAYER_HEIGHT),
      direction: 'left',
      animation: currentAnimation,
    };

    this.getIncButtunList().forEach((bt) => {
      const { name } = bt;
      const { [name]: btState } = this.state;
      playerProps[name] = btState;
    });

    const IncButtonComponents = this.getIncButtunList().map(bt => (<IncButton
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
        <DirectionButton
          name=""
          keys={['up', 'down', 'right', 'left']}
          direction={direction}
          handleChange={this.directionChange}
        />
        {IncButtonComponents}
      </div>
    );
  }
}

export default App;
