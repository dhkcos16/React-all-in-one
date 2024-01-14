import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); // 초기화
  const [xIsNext, setXIsNext] = useState(true); // newSquares의 value가 true이면 X, false이면 O

  const calculateWinner = (squares) => {
    // 승부를 결정을 판단하는 함수 생성
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

  // 승자 표시해주기
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const handleClick = (i) => {
    const newSquares = squares.slice(); // null(디폴트)와 동일한 새로운 배열 생성
    console.log("newSquares", newSquares);
    console.log("newSquares[i]", newSquares[i]);
    if (calculateWinner(newSquares) || newSquares[i]) {
      // 누군가 승리하거나 squares[i]가 이미 클릭되었을 경우, 로직이 멈추도록(클릭 무시) 세팅
      return;
    }

    newSquares[i] = xIsNext ? "X" : "O"; // 배열에 조건부 X, O
    setSquares(newSquares); // X 입력된 배열을 null(디폴트) 배열에 삽입(갈아끼우기)
    setXIsNext((prev) => !prev); // 함수형. 여러줄 복제해서 쓰더라도 다 적용됨 good!
    // setXIsNext(!xIsNext); // 간단하지만 여러줄 복제해서 써도 한 번만 적용됨. bad
  };
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
