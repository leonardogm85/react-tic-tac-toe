import React from 'react';
import Square from './Square';

const Board = ({ squares, cells, onClick }) => {
  const getHighlighted = (index) => {
    return (cells || []).some((cell) => cell === index);
  };

  return (
    <div>
      {
        Array.from([0, 1, 2], (row) => {
          return (
            <div
              className="board-row"
              key={row}>
              {
                Array.from([0, 1, 2], (col) => row * 3 + col).map((index) => {
                  return (
                    <Square
                      key={index}
                      value={squares[index]}
                      highlighted={getHighlighted(index)}
                      onClick={() => onClick(index)} />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default Board;
