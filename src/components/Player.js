import React, { Component } from 'react';

class Player extends Component {
  state = {
    style: {
      backgroundColor: 'black',
      color: 'white',
    },
  };

  render() {
    const { style } = this.state;
    return (
      <div style={style}>
        <p>
          Text
        </p>
      </div>
    );
  }
}

export default Player;
