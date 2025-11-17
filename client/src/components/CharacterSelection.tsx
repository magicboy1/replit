import { useTicTacToe, type Character } from "@/lib/stores/useTicTacToe";
import { useAudio } from "@/lib/stores/useAudio";

const characterData: Record<Character, { icon: string; name: string; isImage?: boolean }> = {
  wisal: { icon: "/characters/girl.png", name: "وصال", isImage: true },
  dhaki: { icon: "/characters/robot.png", name: "ذكي", isImage: true },
  sahaba: { icon: "/characters/sahaba.png", name: "سحابة", isImage: true },
  salama: { icon: "/characters/salama.png", name: "سلامة", isImage: true },
  aman: { icon: "/characters/aman.png", name: "أمان", isImage: true }
};

export function CharacterSelection() {
  const { selectCharacter, unlockedCharacters, player1Character, gameMode } = useTicTacToe();
  const { playClick } = useAudio();

  const handleCharacterSelect = (character: Character) => {
    playClick();
    selectCharacter(character);
  };

  const getTitle = () => {
    if (!player1Character) {
      return "اختر شخصيتك!";
    } else {
      const player1Name = characterData[player1Character].name;
      return `${player1Name} اختار! دورك... اختر شخصيتك!`;
    }
  };

  const availableCharacters = gameMode === "two_player" 
    ? (["wisal", "dhaki", "sahaba", "salama", "aman"] as Character[])
    : (["wisal", "dhaki", "sahaba", "salama", "aman"] as Character[]);

  return (
    <div className="character-selection-screen" dir="rtl">
      <div className="character-selection-container">
        <h1 className="selection-title animated-title">{getTitle()}</h1>
        
        <div className="character-options">
          {availableCharacters.map((character, index) => {
            const isUnlocked = true;
            const isSelected = character === player1Character;
            const charData = characterData[character];
            
            return (
              <button
                key={character}
                className={`character-card ${!isUnlocked ? 'locked' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => isUnlocked && handleCharacterSelect(character)}
                disabled={!isUnlocked || isSelected}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="character-icon">
                  {charData.isImage ? (
                    <img src={charData.icon} alt={charData.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    charData.icon
                  )}
                </div>
                <div className="character-name">{charData.name}</div>
                {!isUnlocked && <div className="lock-badge">🔒</div>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
