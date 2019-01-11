import React from 'react';

function IncButton(prop) {
  const {
    increase,
    decrease,
  } = prop;

  const buttonStyle = {
    height: '100px',
    width: '100px',
    margin: '10px',
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
