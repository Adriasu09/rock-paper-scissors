function renderStartScreen() {
  return `
    <section class="game-screen game-screen--start">
      <h2>[ Pantalla: Inicio del juego ]</h2>
      <p>Aquí va el título "Piedra, Papel o Tijera", la animación central y el botón PLAY vs CPU.</p>
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
    <section class="game">
      <div class="score-hdr">
        <div class="score-cpu">
          <span>CPU</span>
          <span id="cpu-score">${cpuScore}</span>
        </div>

        <span class="score-hdr-vs" aria-hidden="true">VS</span>

        <div class="score-player">
          <span>TÚ</span>
          <span id="player-score">${playerScore}</span>
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
  return `
    <section class="game-screen game-screen--gameover">
      <h2>[ Pantalla: Fin del juego ]</h2>
      <p>Ganador, marcador final, botones "Jugar de nuevo" / "Inicio" / "Compartir".</p>
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
