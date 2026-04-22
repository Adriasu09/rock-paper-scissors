import { HAND_IMAGES, COUNTDOWN_START } from "../../constants/game.js";

export function renderPlayScreen(state) {
  const cpuScore = state?.scores?.cpu ?? 0;
  const playerScore = state?.scores?.player ?? 0;
  const countdown = state?.countdown ?? COUNTDOWN_START;
  const message = state?.message ?? "¡Elige tu movimiento!";
  const cpuHand = state?.hands?.cpu ?? HAND_IMAGES.rock.right;
  const playerHand = state?.hands?.player ?? HAND_IMAGES.rock.left;

  return `
    <section class="game-screen game-screen--play">
      <div class="score-hdr">
        <div class="score-item score-item--cpu">
          <span class="score-item-label">CPU</span>
          <span id="cpu-score" class="score-item-value">${cpuScore}</span>
        </div>

        <span class="score-hdr-vs" aria-hidden="true">VS</span>

        <div class="score-item score-item--player">
          <span class="score-item-label">TÚ</span>
          <span id="player-score" class="score-item-value">${playerScore}</span>
        </div>
      </div>

      <div class="arena">
        <img
          class="arena-hand"
          id="img-cpu"
          src="${cpuHand}"
          alt="left hand"
        />
        <div class="arena-center">
          <div class="arena-circle">
            <span id="countdown">${countdown}</span>
          </div>
          <span class="arena-vs" aria-hidden="true">VS</span>
        </div>
        <img
          class="arena-hand"
          id="img-player"
          src="${playerHand}"
          alt="right hand"
        />
      </div>

      <div class="ctrl-section">
        <p id="message" class="ctrl-section-message">${message}</p>

        <div class="options" role="group" aria-label="Elige tu movimiento">
          <button
            type="button"
            id="btn-rock"
            class="btn--move btn--move--rock"
            aria-keyshortcuts="A"
          >
            <img
              class="btn--move-icon"
              src="./assets/icon/rock.svg"
              alt="Rock"
              aria-hidden="true"
            />
            <span class="btn--move-label">Piedra</span>
            <kbd class="btn--move-key" aria-hidden="true">A</kbd>
          </button>

          <button
            type="button"
            id="btn-paper"
            class="btn--move btn--move--paper"
            aria-keyshortcuts="S"
          >
            <img
              class="btn--move-icon"
              src="./assets/icon/Paper.svg"
              alt="Paper"
              aria-hidden="true"
            />
            <span class="btn--move-label">Papel</span>
            <kbd class="btn--move-key" aria-hidden="true">S</kbd>
          </button>

          <button
            type="button"
            id="btn-scissors"
            class="btn--move btn--move--scissors"
            aria-keyshortcuts="D"
          >
            <img
              class="btn--move-icon"
              src="./assets/icon/scissors.svg"
              alt="Scissor"
              aria-hidden="true"
            />
            <span class="btn--move-label">Tijera</span>
            <kbd class="btn--move-key" aria-hidden="true">D</kbd>
          </button>
        </div>
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
          alt="Sound"
          aria-hidden="true"
        />
      </button>
    </section>
  `;
}
