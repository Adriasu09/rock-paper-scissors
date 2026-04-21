import { GAME_OVER_VARIANTS } from "../../constants/game.js";

export function renderGameOverScreen(state) {
  const winner = state?.winner ?? "player";
  const playerScore = state?.scores?.player ?? 0;
  const cpuScore = state?.scores?.cpu ?? 0;
  const playerName = (state?.playerName ?? "JUGADOR").toUpperCase();

  const variant = GAME_OVER_VARIANTS[winner] ?? GAME_OVER_VARIANTS.player;
  const title = variant.title(playerName);
  const { playerImg, cpuImg } = variant;

  return `
    <section class="game-screen game-screen--over">
      <img class="gameover-trophy" src="./assets/icon/trophy-yellow.svg" alt="" aria-hidden="true" />
      <h2 class="gameover-title">${title}</h2>

      <div class="gameover-arena">
        <img class="gameover-result" src="${playerImg}" alt="" />
        <span class="gameover-arena-vs" aria-hidden="true">VS</span>
        <img class="gameover-result" src="${cpuImg}" alt="" />
      </div>

      <div class="gameover-score">
        <div class="score-item score-item--player">
          <span class="score-item-label">TÚ</span>
          <span id="final-player-score" class="score-item-value">${playerScore}</span>
        </div>
        <span class="gameover-score-sep" aria-hidden="true"></span>
        <div class="score-item score-item--cpu">
          <span class="score-item-label">CPU</span>
          <span id="final-cpu-score" class="score-item-value">${cpuScore}</span>
        </div>
      </div>

      <p class="gameover-message">¡Gran partida! ¿Quieres la revancha?</p>

      <div class="gameover-actions">
        <button type="button" id="btn-replay" class="btn btn--primary">
          <img src="./assets/icon/retry.svg" alt="" aria-hidden="true" />
          Jugar de Nuevo
        </button>
        <button type="button" id="btn-home" class="btn btn--ghost">
          <img src="./assets/icon/home.svg" alt="" aria-hidden="true" />
          Inicio
        </button>
        <button type="button" id="btn-share" class="btn btn--ghost">
          <img src="./assets/icon/share.svg" alt="" aria-hidden="true" />
          Compartir
        </button>
      </div>

      <button
        type="button"
        id="btn-sound"
        class="sound-btn"
        aria-label="Silenciar sonido"
        aria-pressed="false"
      >
        <img
          class="sound-btn-icon"
          src="./assets/icon/volume-2.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </section>
  `;
}
