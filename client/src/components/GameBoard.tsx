import { useTicTacToe } from "@/lib/stores/useTicTacToe";
import { useAudio } from "@/lib/stores/useAudio";

export function GameBoard() {
  const { board, makeMove, playerCharacter, aiCharacter, currentTurn } = useTicTacToe();
  const { playHit } = useAudio();

  const handleCellClick = (index: number) => {
    if (board[index] === null && currentTurn === "player") {
      playHit();
      makeMove(index);
    }
  };

  const getCharacterIcon = (cellValue: "player" | "ai" | null) => {
    if (cellValue === null) return "";
    
    const character = cellValue === "player" ? playerCharacter : aiCharacter;
    
    if (character === "girl") {
      return "👧";
    } else if (character === "robot") {
      return "🤖";
    }
    return "";
  };

  return (
    <div className="game-board-container">
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`game-cell ${cell !== null ? 'filled' : ''} ${currentTurn === 'player' && cell === null ? 'clickable' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={cell !== null || currentTurn !== "player"}
          >
            <span className="cell-icon">{getCharacterIcon(cell)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
