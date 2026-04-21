const MIN_LENGTH = 3;

export function renderNameModal() {
  return `
    <div class="modal-overlay" id="name-modal" role="dialog" aria-modal="true" aria-labelledby="name-modal-title">
      <div class="modal modal--name">
        <h2 id="name-modal-title" class="modal-title">¿Cuál es tu nombre?</h2>
        <p class="modal-subtitle">Mínimo ${MIN_LENGTH} caracteres</p>
        <input
          id="name-input"
          class="modal-input"
          type="text"
          maxlength="16"
          autocomplete="off"
          placeholder="Escribe tu nombre"
        />
        <button id="name-confirm" type="button" class="btn btn--primary modal-confirm" disabled>
          Comenzar
        </button>
      </div>
    </div>
  `;
}

export function attachNameModal(onConfirm) {
  const overlay = document.getElementById("name-modal");
  if (!overlay) return;

  const input = overlay.querySelector("#name-input");
  const confirmBtn = overlay.querySelector("#name-confirm");

  const isValid = () => input.value.trim().length >= MIN_LENGTH;

  const updateState = () => {
    confirmBtn.disabled = !isValid();
  };

  const submit = () => {
    if (!isValid()) return;
    const name = input.value.trim();
    overlay.remove();
    onConfirm(name);
  };

  input.addEventListener("input", updateState);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  });
  confirmBtn.addEventListener("click", submit);

  input.focus();
}
