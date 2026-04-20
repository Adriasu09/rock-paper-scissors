const AUTO_CLOSE_MS = 1500;

const VARIANTS = {
  win:  { title: "¡Ganaste la ronda!", className: "modal--round-win",  icon: "./assets/icon/trophy-yellow.svg" },
  lose: { title: "Perdiste la ronda",  className: "modal--round-lose", icon: "./assets/icon/retry.svg" },
  tie:  { title: "Empate",             className: "modal--round-tie", icon: "./assets/icon/rules.svg" },
};

export function showRoundResult(result) {
  const variant = VARIANTS[result] ?? VARIANTS.tie;

  const existing = document.getElementById("round-modal");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "round-modal";
  overlay.className = "modal-overlay modal-overlay--round";
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  overlay.innerHTML = `
    <div class="modal modal--round ${variant.className}">
      <img class="modal-round-icon" src="${variant.icon}" alt="" aria-hidden="true" />
      <h2 class="modal-title">${variant.title}</h2>
    </div>
  `;
  document.body.appendChild(overlay);

  return new Promise((resolve) => {
    setTimeout(() => {
      overlay.classList.add("modal-overlay--closing");
      setTimeout(() => {
        overlay.remove();
        resolve();
      }, 200);
    }, AUTO_CLOSE_MS);
  });
}
