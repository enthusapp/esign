import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
  constructor(props) {
    super(props);
    this.textP = React.createRef();
  }

  componentDidMount() {
    this.setAnimate();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setAnimate();
    }
  }

  setAnimate() {
    const {
      speed,
      height,
      fontSize,
    } = this.props;

    this.textP.current.animate([
      // { transform: `translateY(${height}rem)` },
      // { transform: `translateY(${Math.trunc((height - fontSize) / 2)}rem)`, offset: 0.3 },
      // { transform: `translateY(${Math.trunc((height - fontSize) / 2)}rem)`, offset: 0.6 },
      // { transform: `translateY(-${height}rem)` },
      // { transform: 'translate(10rem, 10rem)' },
      // { transform: 'translate(0rem, 10rem)', offset: 0.3 },
      // { transform: 'translate(0rem, 10rem)', offset: 0.6 },
      // { transform: 'translate(-10rem, 10rem)' },
      // { transform: `translateX(${10}rem)` },
      // { transform: `translateX(${0}rem)`, offset: 0.3 },
      // { transform: `translateX(${0}rem)`, offset: 0.6 },
      // { transform: `translateX(-${10}rem)` },
      { transform: `translate(100%, 2rem)` },
      { transform: `translate(0%, 2rem)`, offset: 0.3 },
      { transform: `translate(0%, 2rem)`, offset: 0.6 },
      { transform: `translate(-100%, 2rem)` },
    ], {
      duration: speed * 1000,
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

    return (
      <div
        style={{
          backgroundColor,
          color,
          overflow: 'hidden',
          position: 'relative',
          height: `${height}rem`,
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
            fontSize: `${fontSize}rem`,
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
  speed: PropTypes.number.isRequired,
};

export default Player;
