import { useTicTacToe, type Character } from "@/lib/stores/useTicTacToe";
import { useEffect, useRef } from "react";
import { useAudio } from "@/lib/stores/useAudio";
import Confetti from "react-confetti";

const characterIcons: Record<Character, { icon: string; name: string; isImage?: boolean }> = {
  wisal: { icon: "/characters/girl.png", name: "وصال", isImage: true },
  dhaki: { icon: "/characters/robot.png", name: "ذكي", isImage: true },
  sahaba: { icon: "/characters/sahaba.png", name: "سحابة", isImage: true },
  salama: { icon: "/characters/salama.png", name: "سلامة", isImage: true },
  aman: { icon: "/characters/aman.png", name: "أمان", isImage: true }
};

export function GameUI() {
  const { phase, winner, restart, player1Character, player2Character, currentTurn, gameMode, unlockCharacter, resetToStart } = useTicTacToe();
  const { playSuccess, playClick } = useAudio();
  const prevTurnRef = useRef(currentTurn);

  useEffect(() => {
    if (phase === "playing" && currentTurn !== prevTurnRef.current) {
      prevTurnRef.current = currentTurn;
    }
  }, [currentTurn, phase, gameMode]);

  useEffect(() => {
    if (winner && winner !== "draw") {
      playSuccess();
      
      if (winner === "player1") {
        const characters: Character[] = ["sahaba", "salama", "aman"];
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        setTimeout(() => {
          unlockCharacter(randomChar);
        }, 2000);
      }
    }
  }, [winner, playSuccess, unlockCharacter]);

  if (phase !== "playing" && phase !== "game_over") {
    return null;
  }

  const getStatusMessage = () => {
    if (phase === "game_over") {
      if (winner === "player1") {
        const charName = player1Character ? characterIcons[player1Character].name : "";
        return gameMode === "single" ? "رائع! فزت بالجولة 🎉" : `${charName} فاز! 🎉`;
      } else if (winner === "player2") {
        const charName = player2Character ? characterIcons[player2Character].name : "";
        if (gameMode === "single") {
          return "حاول مرة ثانية! 💪";
        } else {
          return `${charName} فاز! 🎉`;
        }
      } else if (winner === "draw") {
        return "تعادل! جرب مرة ثانية 🤝";
      }
    } else if (currentTurn === "player1") {
      const charName = player1Character ? characterIcons[player1Character].name : "";
      return gameMode === "two_player" ? `دور ${charName}! 👆` : "دورك! 👆";
    } else {
      const charName = player2Character ? characterIcons[player2Character].name : "";
      return gameMode === "two_player" ? `دور ${charName}! 👆` : `دور ${charName}... 🤔`;
    }
    return "";
  };

  const getWinnerIcon = () => {
    if (winner === "draw") {
      return (
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          {player1Character && (() => {
            const charData = characterIcons[player1Character];
            if (charData.isImage) {
              return <img src={charData.icon} alt="" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />;
            }
            return <span style={{ fontSize: '90px' }}>{charData.icon}</span>;
          })()}
          {player2Character && (() => {
            const charData = characterIcons[player2Character];
            if (charData.isImage) {
              return <img src={charData.icon} alt="" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />;
            }
            return <span style={{ fontSize: '90px' }}>{charData.icon}</span>;
          })()}
        </div>
      );
    }
    
    const winnerCharacter = winner === "player1" ? player1Character : player2Character;
    if (!winnerCharacter) return null;
    
    const charData = characterIcons[winnerCharacter];
    if (charData.isImage) {
      return <img src={charData.icon} alt="" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />;
    }
    return <span style={{ fontSize: '140px' }}>{charData.icon}</span>;
  };

  const getGameOverMessage = () => {
    if (winner === "player1") {
      const charName = player1Character ? characterIcons[player1Character].name : "";
      return gameMode === "single" ? "رائع! فزت بالجولة 🎉" : `${charName} فاز! 🎉`;
    } else if (winner === "player2") {
      const charName = player2Character ? characterIcons[player2Character].name : "";
      if (gameMode === "single") {
        return "حاول مرة ثانية! 💪";
      } else {
        return `${charName} فاز! 🎉`;
      }
    } else if (winner === "draw") {
      return "تعادل! جرب مرة ثانية 🤝";
    }
    return "";
  };

  const getCurrentPlayerIcon = () => {
    const character = currentTurn === "player1" ? player1Character : player2Character;
    if (!character) return null;
    
    const charData = characterIcons[character];
    if (charData.isImage) {
      return <img src={charData.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
    }
    return charData.icon;
  };

  const goToStart = () => {
    playClick();
    resetToStart();
  };

  const handleRestart = () => {
    playClick();
    restart();
  };

  return (
    <>
      <div className="game-header" dir="rtl">
        <div className="player-indicator">
          <div className="player-icon">{getCurrentPlayerIcon()}</div>
          <span className="player-label">
            {gameMode === "two_player" 
              ? (currentTurn === "player1" 
                  ? (player1Character ? characterIcons[player1Character].name : "")
                  : (player2Character ? characterIcons[player2Character].name : ""))
              : (currentTurn === "player1" ? "أنت" : (player2Character ? characterIcons[player2Character].name : ""))
            }
          </span>
        </div>
        
        <div className="status-message">
          {getStatusMessage()}
        </div>

        <div className="header-actions">
          <button className="header-button" onClick={handleRestart}>
            <span>إعادة اللعب</span>
            <span>🔄</span>
          </button>
          <button className="header-button" onClick={goToStart}>
            <span>البداية</span>
            <span>🏠</span>
          </button>
        </div>
      </div>

      {phase === "game_over" && (
        <>
          {winner && winner !== "draw" && (
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={400}
              colors={['#48A079', '#E5F26B', '#F46A4E', '#2C3A52', '#FFFFFF']}
            />
          )}
          <div className="game-over-overlay" dir="rtl">
            <div className="game-over-card pulse">
              <div className="winner-icon-container">
                {getWinnerIcon()}
              </div>
              <h2 className="game-over-message animated">{getGameOverMessage()}</h2>
              <div className="game-over-actions">
                <button className="game-over-button primary" onClick={handleRestart}>
                  <span>إعادة اللعب</span>
                  <span>🔄</span>
                </button>
                <button className="game-over-button secondary" onClick={goToStart}>
                  <span>البداية</span>
                  <span>🏠</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
