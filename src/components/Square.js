import React from "react";
import "./Square.css";

//this만 빼기& props인수 넣기 or "디스트럭처링"
const Square = ({ onClick, value }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
