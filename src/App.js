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
