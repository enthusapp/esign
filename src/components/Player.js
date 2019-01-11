import React from 'react';

function Player(prop) {
  const {
    text,
    backgroundColor,
    color,
    height,
  } = prop;

  return (
    <div style={{
      backgroundColor,
      color,
      overflow: 'hidden',
      position: 'relative',
      height,
    }}
    >
      <p style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: '0',
        lineHeight: '100%',
        textAlign: 'center',
        fontSize: '30px',
      }}
      >
        {text}
      </p>
    </div>
  );
}

export default Player;
