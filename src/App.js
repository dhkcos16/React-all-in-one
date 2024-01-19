import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

const App = () => {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber]; // 히스토리 배열의 마지막을 잡아줘야 하는데, 3번째가 마지막이면 lenght:3 이고 index는 2가 되므로 -1을 해준다.
  const winner = calculateWinner(current.squares); // 히스토리 배열의 마지막 배열의 squares를 불러옴.

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = `Next Player: ${xIsNext ? "X" : "O"}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      // 누군가 승리하거나 square가 이미 클릭 되어졌다면, 클릭을 무시하도록 변경 ! 결과가 나오면 로직을 끊어주는 코드.
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O"; // 조건에 따라 X or O
    setHistory([...newHistory, { squares: newSquares }]); // 기존:newSquares => 변경:  history 함수를 펼침. 추가된 squares를 history에 추가한다.
    setXIsNext((prev) => !prev); // 함수형. 여러줄 복제해서 쓰더라도 다 적용됨 good!
    // setXIsNext(!xIsNext); // 간단하지만 여러줄 복제해서 써도 한 번만 적용됨. bad
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
      <ol>{moves}</ol>
    </div>
  );
};

export default App;
