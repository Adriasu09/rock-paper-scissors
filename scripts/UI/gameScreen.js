function renderStartScreen() {
  return `
    <section class="game-screen game-screen--start">
      <h1 class="title">Piedra, Papel o Tijera</h1>
      <p class="subtitle">¡Desafía tu suerte!</p>

      <div class="hero-image">
        <img src="./assets/images/generated-1775768550770.png" alt="manos">
      </div>

      <div class="options">
        <button class="option option--rock">
          <img src="./assets/icon/rock-color.svg" alt="piedra">
          <span>PIEDRA</span>
        </button>
        <button class="option option--paper">
          <img src="./assets/icon/Paper-color.svg" alt="papel">
          <span>PAPEL</span>
        </button>
        <button class="option option--scissors">
          <img src="./assets/icon/scissors-color.svg" alt="tijera">
          <span>TIJERA</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="actions">
        <button class="btn-play">
          <img src="./assets/icon/zap.svg" alt="rayo">
          PLAY vs CPU
        </button>
        <button class="btn-rules">
          <img src="./assets/icon/rules.svg" alt="reglas">
          <span class="btn-rules-label-full">Reglas del juego</span>
          <span class="btn-rules-label-short">Reglas</span>
        </button>
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
      </div>
    </section>
  `;
}

function renderPlayScreen(state) {
  const cpuScore = state?.scores?.cpu ?? 0;
  const playerScore = state?.scores?.player ?? 0;
  const countdown = state?.countdown ?? 3;
  const message = state?.message ?? "¡Elige tu movimiento!";
  const cpuHand = state?.hands?.cpu ?? "./assets/images/rock-right.png";
  const playerHand = state?.hands?.player ?? "./assets/images/rock-left.png";

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

function renderGameOverScreen(state) {
  const winner = state?.winner ?? "player";
  const playerScore = state?.scores?.player ?? 0;
  const cpuScore = state?.scores?.cpu ?? 0;
  const playerName = (state?.playerName ?? "JUGADOR").toUpperCase();

  const variants = {
    player: { title: `¡${playerName} GANA!`, playerImg: "victory.png", cpuImg: "defeat.png" },
    cpu:    { title: "¡CPU GANA!",           playerImg: "defeat.png",  cpuImg: "victory.png" },
    tie:    { title: "¡EMPATE!",             playerImg: "victory.png", cpuImg: "victory.png" },
  };
  const { title, playerImg, cpuImg } = variants[winner] ?? variants.player;

  return `
    <section class="game-screen game-screen--over">
      <img class="gameover-trophy" src="./assets/icon/trophy-yellow.svg" alt="" aria-hidden="true" />
      <h2 class="gameover-title">${title}</h2>

      <div class="gameover-arena">
        <img class="gameover-result" src="./assets/images/${playerImg}" alt="" />
        <span class="gameover-arena-vs" aria-hidden="true">VS</span>
        <img class="gameover-result" src="./assets/images/${cpuImg}" alt="" />
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

export function renderGameScreen(state) {
  const view = state?.view ?? "start";
  switch (view) {
    case "play":
      return renderPlayScreen(state);
    case "gameOver":
      return renderGameOverScreen(state);
    case "start":
    default:
      return renderStartScreen();
  }
}
