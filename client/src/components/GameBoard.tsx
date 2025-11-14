import { useTicTacToe, type Character } from "@/lib/stores/useTicTacToe";
import { useAudio } from "@/lib/stores/useAudio";

const characterIcons: Record<Character, string> = {
  girl: "👧",
  robot: "🤖",
  cat: "🐱",
  dog: "🐶",
  bear: "🐻",
  lion: "🦁"
};

export function GameBoard() {
  const { board, makeMove, player1Character, player2Character, currentTurn, gameMode } = useTicTacToe();
  const { playHit } = useAudio();

  const handleCellClick = (index: number) => {
    if (board[index] === null) {
      playHit();
      makeMove(index);
    }
  };

  const getCharacterIcon = (cellValue: "player1" | "player2" | null) => {
    if (cellValue === null) return "";
    
    const character = cellValue === "player1" ? player1Character : player2Character;
    
    if (character) {
      return characterIcons[character];
    }
    return "";
  };

  const canClick = (index: number) => {
    if (board[index] !== null) return false;
    if (gameMode === "two_player") return true;
    return currentTurn === "player1";
  };

  return (
    <div className="game-board-container">
      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`game-cell ${cell !== null ? 'filled' : ''} ${canClick(index) ? 'clickable' : ''}`}
            onClick={() => handleCellClick(index)}
            disabled={!canClick(index)}
          >
            <span className="cell-icon">{getCharacterIcon(cell)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
