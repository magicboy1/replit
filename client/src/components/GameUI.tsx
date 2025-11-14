import { useTicTacToe } from "@/lib/stores/useTicTacToe";
import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";

export function GameUI() {
  const { phase, winner, restart, playerCharacter, currentTurn } = useTicTacToe();
  const { playSuccess } = useAudio();

  useEffect(() => {
    if (winner && winner !== "draw") {
      playSuccess();
    }
  }, [winner, playSuccess]);

  if (phase !== "playing" && phase !== "game_over") {
    return null;
  }

  const getStatusMessage = () => {
    if (phase === "game_over") {
      if (winner === "player") {
        return "رائع! فزت بالجولة 🎉";
      } else if (winner === "ai") {
        return "حاول مرة ثانية! 💪";
      } else if (winner === "draw") {
        return "تعادل! جرب مرة ثانية 🤝";
      }
    } else if (currentTurn === "player") {
      return "دورك! 👆";
    } else {
      return "دور الروبوت... 🤔";
    }
    return "";
  };

  const getPlayerCharacterIcon = () => {
    return playerCharacter === "girl" ? "👧" : "🤖";
  };

  return (
    <div className="game-ui-overlay" dir="rtl">
      <div className="game-header">
        <div className="player-indicator">
          <span className="player-icon">{getPlayerCharacterIcon()}</span>
          <span className="player-label">أنت</span>
        </div>
        
        <div className="status-message">
          {getStatusMessage()}
        </div>
      </div>

      {phase === "game_over" && (
        <div className="game-over-overlay">
          <div className="game-over-card">
            <h2 className="game-over-message">{getStatusMessage()}</h2>
            <button className="restart-button" onClick={restart}>
              إعادة اللعب 🔄
            </button>
          </div>
        </div>
      )}

      {phase === "playing" && (
        <div className="game-controls">
          <button className="restart-button-small" onClick={restart}>
            إعادة اللعب 🔄
          </button>
        </div>
      )}
    </div>
  );
}
