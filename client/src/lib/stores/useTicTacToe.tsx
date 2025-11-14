import { create } from "zustand";

export type Character = "girl" | "robot";
export type Player = "player" | "ai";
export type CellValue = null | Player;
export type GamePhase = "character_selection" | "playing" | "game_over";

interface TicTacToeState {
  phase: GamePhase;
  playerCharacter: Character | null;
  aiCharacter: Character | null;
  board: CellValue[];
  currentTurn: Player;
  winner: Player | "draw" | null;
  
  selectCharacter: (character: Character) => void;
  makeMove: (index: number) => void;
  restart: () => void;
  checkWinner: () => Player | "draw" | null;
  makeAIMove: () => void;
}

const initialBoard: CellValue[] = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const useTicTacToe = create<TicTacToeState>((set, get) => ({
  phase: "character_selection",
  playerCharacter: null,
  aiCharacter: null,
  board: initialBoard,
  currentTurn: "player",
  winner: null,
  
  selectCharacter: (character: Character) => {
    const aiChar: Character = character === "girl" ? "robot" : "girl";
    set({
      playerCharacter: character,
      aiCharacter: aiChar,
      phase: "playing"
    });
  },
  
  checkWinner: () => {
    const { board } = get();
    
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }
    
    if (board.every(cell => cell !== null)) {
      return "draw";
    }
    
    return null;
  },
  
  makeMove: (index: number) => {
    const { board, currentTurn, winner, phase } = get();
    
    if (phase !== "playing" || winner || board[index] || currentTurn !== "player") {
      return;
    }
    
    const newBoard = [...board];
    newBoard[index] = "player";
    
    set({ board: newBoard });
    
    const result = get().checkWinner();
    
    if (result) {
      set({ winner: result, phase: "game_over" });
    } else {
      set({ currentTurn: "ai" });
      setTimeout(() => {
        get().makeAIMove();
      }, 500);
    }
  },
  
  makeAIMove: () => {
    const { board, winner, phase } = get();
    
    if (phase !== "playing" || winner) {
      return;
    }
    
    const emptyIndices = board
      .map((cell, index) => cell === null ? index : null)
      .filter(index => index !== null) as number[];
    
    if (emptyIndices.length === 0) {
      return;
    }
    
    let aiMoveIndex: number;
    
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const cells = [board[a], board[b], board[c]];
      const emptyInCombo = combo.filter(i => board[i] === null);
      
      if (cells.filter(c => c === "ai").length === 2 && emptyInCombo.length === 1) {
        aiMoveIndex = emptyInCombo[0];
        const newBoard = [...board];
        newBoard[aiMoveIndex] = "ai";
        set({ board: newBoard, currentTurn: "player" });
        
        const result = get().checkWinner();
        if (result) {
          set({ winner: result, phase: "game_over" });
        }
        return;
      }
    }
    
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const cells = [board[a], board[b], board[c]];
      const emptyInCombo = combo.filter(i => board[i] === null);
      
      if (cells.filter(c => c === "player").length === 2 && emptyInCombo.length === 1) {
        aiMoveIndex = emptyInCombo[0];
        const newBoard = [...board];
        newBoard[aiMoveIndex] = "ai";
        set({ board: newBoard, currentTurn: "player" });
        
        const result = get().checkWinner();
        if (result) {
          set({ winner: result, phase: "game_over" });
        }
        return;
      }
    }
    
    if (board[4] === null) {
      aiMoveIndex = 4;
    } else {
      const corners = [0, 2, 6, 8].filter(i => board[i] === null);
      if (corners.length > 0) {
        aiMoveIndex = corners[Math.floor(Math.random() * corners.length)];
      } else {
        aiMoveIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    }
    
    const newBoard = [...board];
    newBoard[aiMoveIndex] = "ai";
    set({ board: newBoard, currentTurn: "player" });
    
    const result = get().checkWinner();
    if (result) {
      set({ winner: result, phase: "game_over" });
    }
  },
  
  restart: () => {
    set({
      phase: "character_selection",
      playerCharacter: null,
      aiCharacter: null,
      board: Array(9).fill(null),
      currentTurn: "player",
      winner: null
    });
  }
}));
