export function renderStartScreen() {
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
