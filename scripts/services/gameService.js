import { CHOICES, WIN_SCORE } from "../constants/game.js";

const state = {
  playerScore: 0,
  cpuScore: 0,
  playerName: "",
};

export function getCpuChoice() {
  const index = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[index];
}

export function resolveRound(playerChoice, cpuChoice) {
  if (playerChoice === cpuChoice) return "draw";
  if (playerChoice === "rock" && cpuChoice === "scissor") return "win";
  if (playerChoice === "paper" && cpuChoice === "rock") return "win";
  if (playerChoice === "scissor" && cpuChoice === "paper") return "win";
  return "lose";
}

export function applyRoundResult(result) {
  if (result === "win") state.playerScore += 1;
  else if (result === "lose") state.cpuScore += 1;
}

export function isGameOver() {
  return state.playerScore >= WIN_SCORE || state.cpuScore >= WIN_SCORE;
}

export function getWinner() {
  if (!isGameOver()) return null;
  return state.playerScore >= WIN_SCORE ? "player" : "cpu";
}

export function getScores() {
  return { player: state.playerScore, cpu: state.cpuScore };
}

export function getPlayerName() {
  return state.playerName;
}

export function setPlayerName(name) {
  state.playerName = name;
}

export function resetGameState() {
  state.playerScore = 0;
  state.cpuScore = 0;
}
