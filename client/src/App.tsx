import "@fontsource/inter";
import { useTicTacToe } from "./lib/stores/useTicTacToe";
import { ModeSelection } from "./components/ModeSelection";
import { DifficultySelection } from "./components/DifficultySelection";
import { CharacterSelection } from "./components/CharacterSelection";
import { GameBoard } from "./components/GameBoard";
import { GameUI } from "./components/GameUI";
import { SoundManager } from "./components/SoundManager";
import { VoiceManager } from "./components/VoiceManager";

function App() {
  const { phase } = useTicTacToe();

  return (
    <>
      <SoundManager />
      <VoiceManager />
      
      {phase === "mode_selection" && <ModeSelection />}
      
      {phase === "difficulty_selection" && <DifficultySelection />}
      
      {phase === "character_selection" && <CharacterSelection />}
      
      {(phase === "playing" || phase === "game_over") && (
        <>
          <GameBoard />
          <GameUI />
        </>
      )}
    </>
  );
}

export default App;
