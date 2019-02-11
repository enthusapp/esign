import React from 'react';

function IncButton(prop) {
  const {
    increase,
    decrease,
  } = prop;

  const buttonStyle = {
    height: '3rem',
    width: '3rem',
    margin: '0.5rem',
    fontSize: '30px',
  };

  return (
    <div>
      <button
        className="btIncFontSize"
        type="button"
        onClick={increase}
        style={buttonStyle}
      >
        {'+'}
      </button>
      <button
        className="btDecFontSize"
        type="button"
        onClick={decrease}
        style={buttonStyle}
      >
        {'-'}
      </button>
    </div>
  );
}

export default IncButton;
