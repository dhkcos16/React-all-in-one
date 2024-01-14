import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">게임 인포</div>
    </div>
  );
}

export default App;
