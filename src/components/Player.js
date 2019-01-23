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
      { transform: `translateY(${height}rem)` },
      { transform: `translateY(${Math.trunc((height - fontSize) / 2)}rem)`, offset: 0.3 },
      { transform: `translateY(${Math.trunc((height - fontSize) / 2)}rem)`, offset: 0.6 },
      { transform: `translateY(-${height}rem)` },
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

    const {
      transform,
    } = this.state;

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
  speed: PropTypes.number.isRequired,
};

export default Player;
