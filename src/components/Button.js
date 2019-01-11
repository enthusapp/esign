import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    handleEvent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    const { number } = props;
    this.state = {
      number,
    };
  }

  onClick = () => {
    const { handleEvent } = this.props;
    this.setState(({ number }) => ({ number: handleEvent(number) }));
  }

  render() {
    const { text } = this.props;
    const { onClick } = this;
    return (
      <div>
        <button
          type="button"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
    );
  }
}

export default Button;
