import React from 'react';
import './Player.css';

function Player(prop) {
  const {
    text,
    backgroundColor,
    color,
    height,
    direction,
    fontSize,
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
        fontSize: `${fontSize}px`,
        animation: `${direction} 10s linear infinite`,
      }}
      >
        {text}
      </p>
    </div>
  );
}

export default Player;
