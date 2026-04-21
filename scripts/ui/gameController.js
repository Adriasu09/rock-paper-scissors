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
import {
  COUNTDOWN_START,
  COUNTDOWN_INTERVAL_MS,
  HAND_IMAGES,
  SFX,
} from "../constants/game.js";

let isPlaying = false;
let keyboardBound = false;

async function showResult(playerChoice, cpuChoice, result) {
  // 1. Actualizar manos
  const imgCPU = document.getElementById("img-cpu");
  const imgPlayer = document.getElementById("img-player");
  imgCPU.src = HAND_IMAGES[cpuChoice].right;
  imgPlayer.src = HAND_IMAGES[playerChoice].left;

  // 2. SFX según resultado
  if (result === "win") playSfx(SFX.roundWin, 0.7);
  else if (result === "lose") playSfx(SFX.roundLose, 0.7);

  // 3. Limpiar mensaje (el modal muestra el resultado)
  const messageEl = document.getElementById("message");
  messageEl.textContent = "";

  // 4. Actualizar marcador en el DOM con el nuevo estado del servicio
  applyRoundResult(result);
  const scores = getScores();
  document.getElementById("cpu-score").textContent = scores.cpu;
  document.getElementById("player-score").textContent = scores.player;

  // 5. Mostrar modal de ronda y esperar cierre
  const modalResult = result === "draw" ? "tie" : result;
  if (typeof window.__showRoundResult === "function") {
    await window.__showRoundResult(modalResult);
  }

  // 6. ¿Fin de partida?
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

  // 7. Reset UI para la siguiente ronda
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) countdownEl.textContent = String(COUNTDOWN_START);
  if (messageEl) messageEl.textContent = "¡Elige tu movimiento!";
  imgCPU.src = HAND_IMAGES.rock.right;
  imgPlayer.src = HAND_IMAGES.rock.left;
}

function startCountdown(playerChoice) {
  if (isPlaying) return;
  isPlaying = true;

  const countdownEl = document.getElementById("countdown");
  const messageEl = document.getElementById("message");
  const imgCPU = document.getElementById("img-cpu");
  const imgPlayer = document.getElementById("img-player");

  messageEl.textContent = "3...2...1...";
  playSfx(SFX.countdown, 0.7);

  imgCPU.classList.add("is-shaking");
  imgPlayer.classList.add("is-shaking");

  let count = COUNTDOWN_START;
  countdownEl.textContent = count;

  const interval = setInterval(async () => {
    count -= 1;
    countdownEl.textContent = count;

    if (count === 0) {
      clearInterval(interval);
      countdownEl.textContent = " ⚡";

      imgCPU.classList.remove("is-shaking");
      imgPlayer.classList.remove("is-shaking");

      const cpuChoice = getCpuChoice();
      const result = resolveRound(playerChoice, cpuChoice);
      await showResult(playerChoice, cpuChoice, result);

      isPlaying = false;
    }
  }, COUNTDOWN_INTERVAL_MS);
}

export function initGameListeners() {
  const btnRock = document.getElementById("btn-rock");
  const btnPaper = document.getElementById("btn-paper");
  const btnScissors = document.getElementById("btn-scissors");

  if (!btnRock || !btnPaper || !btnScissors) return;

  for (const btn of [btnRock, btnPaper, btnScissors]) {
    btn.addEventListener("mouseenter", () => playSfx(SFX.hover, 0.6));
  }

  btnRock.addEventListener("click", () => startCountdown("rock"));
  btnPaper.addEventListener("click", () => startCountdown("paper"));
  btnScissors.addEventListener("click", () => startCountdown("scissor"));

  // Atajos de teclado (A, S, D) — solo se enganchan una vez
  if (!keyboardBound) {
    keyboardBound = true;
    document.addEventListener("keydown", (e) => {
      if (!document.getElementById("btn-rock")) return;
      const key = e.key.toLowerCase();
      if (key === "a") startCountdown("rock");
      else if (key === "s") startCountdown("paper");
      else if (key === "d") startCountdown("scissor");
    });
  }
}
