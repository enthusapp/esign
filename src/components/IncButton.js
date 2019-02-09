import React from 'react';

function IncButton(prop) {
  const {
    name,
    increase,
    decrease,
  } = prop;

  const buttonStyle = {
    height: '50px',
    width: '50px',
    margin: '10px',
    fontSize: '30px',
  };

  return (
    <div>
      <p className="name">{name}</p>
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
