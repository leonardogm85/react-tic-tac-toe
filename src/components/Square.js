import React from 'react';

const Square = ({ value, highlighted, onClick }) => {
  const getStyle = () => {
    return highlighted
      ? { backgroundColor: 'yellow' }
      : { backgroundColor: 'white' };
  };

  return (
    <button
      className="square"
      style={getStyle()}
      onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
