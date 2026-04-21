import {
  setPlayerName,
  resetGameState,
} from "./scripts/services/gameService.js";
import { initGameListeners } from "./scripts/ui/gameController.js";
import {
  initAudio,
  attachSoundButton,
  playSfx,
} from "./scripts/services/audioService.js";
import { SFX } from "./scripts/constants/game.js";
import { byId } from "./scripts/helpers/dom.js";
import { renderShell } from "./scripts/ui/layout.js";
import { loadSidebar } from "./scripts/ui/sidebar.js";
import { attachStartScreen } from "./scripts/ui/screens/startScreen.js";
import { attachGameOverScreen } from "./scripts/ui/screens/gameOverScreen.js";
import { renderNavbar, initNavbarInteractions } from "./scripts/ui/navbar.js";
import { renderFooter } from "./scripts/ui/footer.js";

const root = byId("root");
const navbar = byId("navbar");
const footer = byId("footer");

footer.innerHTML = renderFooter();

initAudio();

let gameState = { view: "start" };

function renderLayout({ leftHTML, rightHTML }) {
  root.innerHTML = renderShell({ leftHTML, rightHTML, gameState });
  initGameListeners();
  attachSoundButton();
  attachScreenHandlers();
  attachRetryLocationHandler();
}

function renderNavbarWith(locationData, weatherData) {
  navbar.innerHTML = renderNavbar(locationData, weatherData);
  initNavbarInteractions();
}

function attachScreenHandlers() {
  if (gameState.view === "start") {
    attachStartScreen({ onPlay: handleStartGame });
  } else if (gameState.view === "gameOver") {
    attachGameOverScreen({
      onReplay: () => handleStartGame(gameState.playerName),
      onHome: handleGoHome,
    });
  }
}

function handleStartGame(name) {
  resetGameState();
  setPlayerName(name);
  playSfx(SFX.startGame, 0.7);
  setGameState({
    view: "play",
    playerName: name,
    scores: { player: 0, cpu: 0 },
  });
}

function handleGoHome() {
  resetGameState();
  setGameState({ view: "start" });
}

function attachRetryLocationHandler() {
  const retryBtn = byId("retry-location");
  if (!retryBtn) return;
  retryBtn.addEventListener("click", () => loadSidebar(renderNavbarWith, renderLayout));
}

export function setGameState(nextState) {
  gameState = nextState;
  const leftAside = root.querySelector(".sidebar--left");
  const rightAside = root.querySelector(".sidebar--right");
  renderLayout({
    leftHTML: leftAside ? leftAside.innerHTML : "",
    rightHTML: rightAside ? rightAside.innerHTML : "",
  });
}

loadSidebar(renderNavbarWith, renderLayout);
