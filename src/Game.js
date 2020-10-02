import React, { useState } from 'react';
import Board from './components/Board';

const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  const [stepIndex, setStepIndex] = useState(0);
  const [x, setX] = useState(true);
  const [reversed, setReversed] = useState(false);

  const getWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], line];
      }
    }
    return [];
  };

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepIndex + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    const [winner] = getWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = x
      ? 'X'
      : 'O';
    setHistory([...newHistory, { squares }]);
    setStepIndex(newHistory.length);
    setX(!x);
  };

  const jumpTo = (step) => {
    setStepIndex(step);
    setX((step % 2) === 0);
  };

  const getMoveHistory = (step, move) => {
    let description = 'Go to game start';
    if (move) {
      const index = history[move - 1]
        .squares
        .findIndex((square, index) => {
          return square !== step.squares[index];
        });
      const col = index % 3 + 1;
      const row = Math.floor(index / 3 + 1);
      const player = (move % 2) === 0
        ? 'O'
        : 'X';
      description = `Go to move #${move} ${player} (${col}, ${row})`;
    }
    if (stepIndex === move) {
      return (<b>{description}</b>);
    } else {
      return (<i>{description}</i>);
    }
  };

  const getStatus = () => {
    const [winner] = getWinner(history[stepIndex].squares);
    return winner
      ? `Winner ${winner}`
      : isEnded()
        ? 'Draw'
        : `Next player: ${x ? 'X' : 'O'}`;
  };

  const isEnded = () => {
    return history[stepIndex].squares.every((square) => square);
  };

  const getMovies = () => {
    const movies = history.map((step, move) => {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>
            {getMoveHistory(step, move)}
          </button>
        </li>
      );
    });

    return reversed
      ? movies.reverse()
      : movies;
  };

  const getToggle = () => {
    return (
      <button onClick={() => setReversed(!reversed)}>
        Toggle move ({reversed ? 'desc' : 'asc'})
      </button>
    );
  };

  const getCells = () => {
    const [, cells] = getWinner(history[stepIndex].squares);
    return cells;
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepIndex].squares}
          cells={getCells()}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>
          {getStatus()}
        </div>
        <div>
          {getToggle()}
        </div>
        <ol reversed={reversed}>
          {getMovies()}
        </ol>
      </div>
    </div>
  );
};

export default Game;
