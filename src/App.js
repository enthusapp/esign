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
    const { number } = this.state;
    this.setState(() => ({ number: number + 1 }));
  }

  render() {
    const { increase } = this;
    return (
      <div className="App">
        <Player
          text="Text"
          backgroundColor="black"
          color="white"
          height="100px"
          direction="scroll-up"
        />
        <button
          type="button"
          onClick={increase}
        >
          {'+'}
        </button>
      </div>
    );
  }
}

export default App;
