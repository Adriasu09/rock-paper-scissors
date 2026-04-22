export function renderRulesModal() {
  return `
    <div class="modal-overlay" id="rules-modal" role="dialog" aria-modal="true" aria-labelledby="rules-modal-title">
      <div class="modal modal--rules">
        <button id="rules-close" type="button" class="modal-close" aria-label="Cerrar">&times;</button>
        <h2 id="rules-modal-title" class="modal-title">Reglas del juego</h2>
        <p class="modal-subtitle">El primero en llegar a 3 puntos gana la partida</p>

        <ul class="rules-list">
          <li class="rules-item">
            <span class="rules-item__icon" aria-hidden="true">✊</span>
            <span class="rules-item__text"><strong>Piedra</strong> aplasta a <strong>Tijera</strong></span>
          </li>
          <li class="rules-item">
            <span class="rules-item__icon" aria-hidden="true">✋</span>
            <span class="rules-item__text"><strong>Papel</strong> envuelve a <strong>Piedra</strong></span>
          </li>
          <li class="rules-item">
            <span class="rules-item__icon" aria-hidden="true">✌️</span>
            <span class="rules-item__text"><strong>Tijera</strong> corta a <strong>Papel</strong></span>
          </li>
        </ul>

        <p class="modal-subtitle rules-hint">
          Tip: también puedes jugar con <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>
        </p>
      </div>
    </div>
  `;
}

export function attachRulesModal() {
  const overlay = document.getElementById("rules-modal");
  if (!overlay) return;

  const closeBtn = overlay.querySelector("#rules-close");
  const close = () => overlay.remove();

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape" && document.getElementById("rules-modal")) {
      close();
      document.removeEventListener("keydown", onEsc);
    }
  });
}
