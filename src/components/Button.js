import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    const { number } = props;
    this.state = {
      number,
    };
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <button type="button">{text}</button>
      </div>
    );
  }
}

export default Button;
