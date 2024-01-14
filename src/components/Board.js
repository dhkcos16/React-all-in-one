import React, { Component } from "react";
import Square from "./Square";
import "./Board.css";

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null) };
  }
  handleClick(i) {
    const squares = this.state.squares.slice(); // null(디폴트)와 동일한 새로운 배열 생성
    squares[i] = "X"; // 배열에 X 입력 완
    this.setState({ squares: squares }); // X 입력된 배열을 null(디폴트) 배열에 삽입(갈아끼우기)
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  render() {
    return (
      <div>
        <div className="status">Next Player: X, O</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
