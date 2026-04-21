const ICON_ON = "./assets/icon/volume-2.svg";
const ICON_OFF = "./assets/icon/volume-off.svg";

let audio = null;
let isMuted = false;

function tryPlay() {
  if (!audio) return;
  const promise = audio.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      const unlock = () => {
        audio.play().catch(() => {});
      };
      document.addEventListener("pointerdown", unlock, { once: true });
    });
  }
}

export function initAudio() {
  if (audio) return;
  audio = new Audio("./assets/sounds/music-game.mp3");
  audio.loop = true;
  audio.volume = 0.1;
  audio.muted = isMuted;
  tryPlay();
}

export function isAudioMuted() {
  return isMuted;
}

export function playSfx(path, volume = 0.6) {
  if (isMuted) return;
  const sfx = new Audio(path);
  sfx.volume = volume;
  sfx.play().catch(() => {});
}

export function toggleMute() {
  isMuted = !isMuted;
  if (audio) audio.muted = isMuted;
  return isMuted;
}

function refreshButton(btn) {
  const icon = btn.querySelector(".sound-btn-icon");
  if (icon) icon.src = isMuted ? ICON_OFF : ICON_ON;
  btn.setAttribute("aria-pressed", String(isMuted));
  btn.setAttribute("aria-label", isMuted ? "Activar sonido" : "Silenciar sonido");
  btn.classList.toggle("is-muted", isMuted);
}

export function attachSoundButton() {
  const btn = document.getElementById("btn-sound");
  if (!btn) return;
  refreshButton(btn);
  btn.addEventListener("click", () => {
    toggleMute();
    if (!isMuted) tryPlay();
    refreshButton(btn);
  });
}
