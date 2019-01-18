import React, { Component } from 'react';
import Player from './components/Player';
import IncButton from './components/IncButton';

const incButtonList = [
  {
    id: 0,
    name: 'fontSize',
    defaultVal: 30,
    lowLimit: 1,
    highLimit: 100,
    reverse: false,
  },
  {
    id: 1,
    name: 'speed',
    defaultVal: 30,
    lowLimit: 1,
    highLimit: 100,
    reverse: true,
  },
];

function increase(name, prev, highLimit) {
  return {
    [name]: prev < highLimit - 1 ? prev + 1 : highLimit,
  };
}

function decrease(name, prev, lowLimit) {
  return {
    [name]: prev > lowLimit + 1 ? prev - 1 : lowLimit,
  };
}

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

      App.prototype[`${name}Inc`] = () => {
        const { [name]: prev } = this.state;
        if (reverse) {
          this.setState(decrease(name, prev, lowLimit));
        } else {
          this.setState(increase(name, prev, highLimit));
        }
      };

      App.prototype[`${name}Dec`] = () => {
        const { [name]: prev } = this.state;
        if (reverse) {
          this.setState(increase(name, prev, highLimit));
        } else {
          this.setState(decrease(name, prev, lowLimit));
        }
      };
    });

    this.state = makeState;
  }

  getIncButtunList = () => incButtonList;

  render() {
    const playerProps = {
      className: 'player',
      text: 'Text',
      backgroundColor: 'black',
      color: 'white',
      height: '100px',
      direction: 'scroll-up',
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
