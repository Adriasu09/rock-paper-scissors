import { setGameState } from "../../index.js";
import { playSfx } from "../services/audioService.js";
import {
  getCpuChoice,
  resolveRound,
  applyRoundResult,
  isGameOver,
  getWinner,
  getScores,
  getPlayerName,
  resetGameState,
} from "../services/gameService.js";
import { showRoundResult } from "./roundModal.js";
import { byId } from "../helpers/dom.js";
import {
  COUNTDOWN_START,
  COUNTDOWN_INTERVAL_MS,
  HAND_IMAGES,
  SFX,
} from "../constants/game.js";

let isPlaying = false;
let keyboardBound = false;

async function showResult(playerChoice, cpuChoice, result) {
  // 1. Update hand images
  const cpuImg = byId("img-cpu");
  const playerImg = byId("img-player");
  cpuImg.src = HAND_IMAGES[cpuChoice].right;
  playerImg.src = HAND_IMAGES[playerChoice].left;

  // 2. Play SFX based on outcome
  if (result === "win") playSfx(SFX.roundWin, 0.7);
  else if (result === "lose") playSfx(SFX.roundLose, 0.7);

  // 3. Clear message (the modal shows the result)
  const messageEl = byId("message");
  messageEl.textContent = "";

  // 4. Update DOM scoreboard from service state
  applyRoundResult(result);
  const scores = getScores();
  byId("cpu-score").textContent = scores.cpu;
  byId("player-score").textContent = scores.player;

  // 5. Show round modal and wait for close
  const modalResult = result === "draw" ? "tie" : result;
  await showRoundResult(modalResult);

  // 6. Is the match over?
  if (isGameOver()) {
    const winner = getWinner();
    const finalScores = getScores();
    const finalName = getPlayerName();
    resetGameState();
    playSfx(winner === "player" ? SFX.gameWin : SFX.gameLose, 0.8);
    setGameState({
      view: "gameOver",
      winner,
      playerName: finalName,
      scores: finalScores,
    });
    return;
  }

  // 7. Reset UI for the next round
  const countdownEl = byId("countdown");
  if (countdownEl) countdownEl.textContent = String(COUNTDOWN_START);
  if (messageEl) messageEl.textContent = "¡Elige tu movimiento!";
  cpuImg.src = HAND_IMAGES.rock.right;
  playerImg.src = HAND_IMAGES.rock.left;
}

function startCountdown(playerChoice) {
  if (isPlaying) return;
  isPlaying = true;

  const countdownEl = byId("countdown");
  const messageEl = byId("message");
  const cpuImg = byId("img-cpu");
  const playerImg = byId("img-player");

  messageEl.textContent = "3...2...1...";
  playSfx(SFX.countdown, 0.7);

  cpuImg.classList.add("is-shaking");
  playerImg.classList.add("is-shaking");

  let count = COUNTDOWN_START;
  countdownEl.textContent = count;

  const interval = setInterval(async () => {
    count -= 1;
    countdownEl.textContent = count;

    if (count === 0) {
      clearInterval(interval);
      countdownEl.textContent = " ⚡";

      cpuImg.classList.remove("is-shaking");
      playerImg.classList.remove("is-shaking");

      const cpuChoice = getCpuChoice();
      const result = resolveRound(playerChoice, cpuChoice);
      await showResult(playerChoice, cpuChoice, result);

      isPlaying = false;
    }
  }, COUNTDOWN_INTERVAL_MS);
}

export function initGameListeners() {
  const btnRock = byId("btn-rock");
  const btnPaper = byId("btn-paper");
  const btnScissors = byId("btn-scissors");

  if (!btnRock || !btnPaper || !btnScissors) return;

  for (const btn of [btnRock, btnPaper, btnScissors]) {
    btn.addEventListener("mouseenter", () => playSfx(SFX.hover, 0.6));
  }

  btnRock.addEventListener("click", () => startCountdown("rock"));
  btnPaper.addEventListener("click", () => startCountdown("paper"));
  btnScissors.addEventListener("click", () => startCountdown("scissor"));

  // Keyboard shortcuts (A, S, D) — bound only once
  if (!keyboardBound) {
    keyboardBound = true;
    document.addEventListener("keydown", (e) => {
      if (!byId("btn-rock")) return;
      const key = e.key.toLowerCase();
      if (key === "a") startCountdown("rock");
      else if (key === "s") startCountdown("paper");
      else if (key === "d") startCountdown("scissor");
    });
  }
}
