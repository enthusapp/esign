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
      animation,
    } = this.props;

    this.textP.current.animate(animation, {
      duration: speed * 1000,
      iterations: Infinity,
    });
  }

  render() {
    const {
      player,
      text,
      backgroundColor,
      color,
      height,
      fontSize,
    } = this.props;

    const backStyle = {
      backgroundColor,
      color,
      overflow: 'hidden',
      position: 'relative',
      height: `${height}rem`,
    };
    if (player) {
      delete backStyle.backgroundColor;
    }

    return (
      <div
        style={backStyle}
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
  player: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  animation: PropTypes.arrayOf(PropTypes.object),
};

Player.defaultProps = {
  animation: [
    { transform: 'translateY(100%)' },
    { transform: 'translateY(-100%)' },
  ],
};

export default Player;
