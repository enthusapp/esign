import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transform: 'translateY(100%)',
    };
    this.textP = React.createRef();
  }

  componentDidMount() {
    this.textP.current.animate([
      { transform: 'translateY(100%)' },
      { transform: 'translateY(50%)', offset: 0.3 },
      { transform: 'translateY(50%)', offset: 0.6 },
      { transform: 'translateY(-100%)' },
    ], {
      duration: 10000,
      iterations: Infinity,
    });
  }

  render() {
    const {
      text,
      backgroundColor,
      color,
      height,
      fontSize,
    } = this.props;

    const {
      transform,
    } = this.state;

    return (
      <div style={{
        backgroundColor,
        color,
        overflow: 'hidden',
        position: 'relative',
        height,
      }}
      >
        <p
          ref={this.textP}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            margin: '0',
            lineHeight: '100%',
            textAlign: 'center',
            fontSize: `${fontSize}px`,
            transform: `${transform}`,
          }}
        >
          {text}
        </p>
      </div>
    );
  }
}

Player.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
};

export default Player;
