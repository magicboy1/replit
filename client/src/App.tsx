import "@fontsource/inter";
import { useTicTacToe } from "./lib/stores/useTicTacToe";
import { CharacterSelection } from "./components/CharacterSelection";
import { GameBoard } from "./components/GameBoard";
import { GameUI } from "./components/GameUI";
import { SoundManager } from "./components/SoundManager";

function App() {
  const { phase } = useTicTacToe();

  return (
    <>
      <SoundManager />
      
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
