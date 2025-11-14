import { useTicTacToe, type Character } from "@/lib/stores/useTicTacToe";

const characterData: Record<Character, { icon: string; name: string }> = {
  girl: { icon: "👧", name: "البنت" },
  robot: { icon: "🤖", name: "الروبوت" },
  cat: { icon: "🐱", name: "القطة" },
  dog: { icon: "🐶", name: "الكلب" },
  bear: { icon: "🐻", name: "الدب" },
  lion: { icon: "🦁", name: "الأسد" }
};

export function CharacterSelection() {
  const { selectCharacter, unlockedCharacters, player1Character, gameMode } = useTicTacToe();

  const handleCharacterSelect = (character: Character) => {
    selectCharacter(character);
  };

  const getTitle = () => {
    if (!player1Character) {
      return gameMode === "two_player" ? "اللاعب الأول: اختر شخصيتك!" : "اختر شخصيتك!";
    } else {
      return "اللاعب الثاني: اختر شخصيتك!";
    }
  };

  return (
    <div className="character-selection-screen" dir="rtl">
      <div className="character-selection-container">
        <h1 className="selection-title">{getTitle()}</h1>
        
        <div className="character-options">
          {(Object.keys(characterData) as Character[]).map((character) => {
            const isUnlocked = unlockedCharacters.includes(character);
            const isSelected = character === player1Character;
            
            return (
              <button
                key={character}
                className={`character-card ${!isUnlocked ? 'locked' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => isUnlocked && handleCharacterSelect(character)}
                disabled={!isUnlocked || isSelected}
              >
                <div className="character-icon">{characterData[character].icon}</div>
                <div className="character-name">{characterData[character].name}</div>
                {!isUnlocked && <div className="lock-badge">🔒</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
