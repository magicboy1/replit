import { useTicTacToe, type Character } from "@/lib/stores/useTicTacToe";

export function CharacterSelection() {
  const { selectCharacter } = useTicTacToe();

  const handleCharacterSelect = (character: Character) => {
    selectCharacter(character);
  };

  return (
    <div className="character-selection-screen" dir="rtl">
      <div className="character-selection-container">
        <h1 className="selection-title">اختر شخصيتك وابدأ اللعب!</h1>
        
        <div className="character-options">
          <button
            className="character-card girl-card"
            onClick={() => handleCharacterSelect("girl")}
          >
            <div className="character-icon">👧</div>
            <div className="character-name">البنت</div>
          </button>
          
          <button
            className="character-card robot-card"
            onClick={() => handleCharacterSelect("robot")}
          >
            <div className="character-icon">🤖</div>
            <div className="character-name">الروبوت</div>
          </button>
        </div>
      </div>
    </div>
  );
}
