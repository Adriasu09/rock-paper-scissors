function renderStartScreen() {
  return `
    <section class="game-screen game-screen--start">
      <h2>[ Pantalla: Inicio del juego ]</h2>
      <p>Aquí va el título "Piedra, Papel o Tijera", la animación central y el botón PLAY vs CPU.</p>
    </section>
  `;
}

function renderPlayScreen(state) {
  return `
    <section class="game-screen game-screen--play">
      <h2>[ Pantalla: Juego en curso ]</h2>
      <p>Marcador, manos enfrentadas, contador y selección de movimiento.</p>
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
