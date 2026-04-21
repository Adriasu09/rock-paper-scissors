import { getUserLocation } from "./scripts/service/geolocationService.js";
import { getWeather } from "./scripts/service/weatherService.js";
import { getNews } from "./scripts/service/newsService.js";
import { renderLocation } from "./scripts/UI/locationSection.js";
import { renderWeather } from "./scripts/UI/weatherSection.js";
import { renderNews } from "./scripts/UI/newsSection.js";
import { renderGameScreen } from "./scripts/UI/gameScreen.js";
import { initGameListeners } from "./scripts/service/gameService.js"; 
import { renderNameModal, attachNameModal } from "./scripts/UI/nameModal.js";
import { showRoundResult } from "./scripts/UI/roundModal.js";
import { initAudio, attachSoundButton } from "./scripts/service/audioController.js";

const root = document.getElementById("root");


initAudio();

// Punto de extensión: la lógica de rondas futura debe llamar a
// window.__showRoundResult("win" | "lose" | "tie") al terminar cada ronda.
window.__showRoundResult = showRoundResult;

let gameState = { view: "start" }; // ← pantalla de inicio (por defecto)
//let gameState = { view: "play" }; // ← juego en curso
// let gameState = {
//   view: "gameOver",
//   winner: "player",
//   scores: { player: 3, cpu: 0 },
// };

function renderLayout({ leftHTML, rightHTML }) {
  root.innerHTML = `
    <aside class="sidebar sidebar--left">
      ${leftHTML}
    </aside>
    <main class="game-area">
      ${renderGameScreen(gameState)}
    </main>
    <aside class="sidebar sidebar--right">
      ${rightHTML}
    </aside>
  `;
  initGameListeners()
  attachSoundButton();
  attachStartScreenHandlers();
}

function attachStartScreenHandlers() {
  if (gameState.view !== "start") return;
  const playBtn = root.querySelector(".btn-play");
  if (!playBtn) return;
  playBtn.addEventListener("click", () => {
    if (document.getElementById("name-modal")) return;
    document.body.insertAdjacentHTML("beforeend", renderNameModal());
    attachNameModal((name) => {
      setGameState({
        view: "play",
        playerName: name,
        scores: { player: 0, cpu: 0 },
      });
    });
  });
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

async function initSidebar() {
  renderLayout({
    leftHTML: renderNews(null),
    rightHTML: renderLocation(null) + renderWeather(null),
  });

  let locationData = null;

  try {
    locationData = await getUserLocation();
    renderLayout({
      leftHTML: renderNews(null),
      rightHTML: renderLocation(locationData) + renderWeather(null),
    });
  } catch (error) {
    console.error("Error en getUserLocation:", error.message);
    renderLayout({
      leftHTML: renderNews({
        error: "Se requiere ubicación para las noticias",
      }),
      rightHTML:
        renderLocation({ error: error.message }) +
        renderWeather({ error: "Se requiere ubicación para el clima" }),
    });

    document
      .getElementById("retry-location")
      .addEventListener("click", initSidebar);
    return;
  }

  const [weatherResult, newsResult] = await Promise.allSettled([
    getWeather(locationData.latitude, locationData.longitude),
    getNews(locationData.countryCode),
  ]);

  const weatherHTML =
    weatherResult.status === "fulfilled"
      ? renderWeather(weatherResult.value)
      : renderWeather({ error: weatherResult.reason.message });

  const newsHTML =
    newsResult.status === "fulfilled"
      ? renderNews({
          country: locationData.country,
          countryCode: locationData.countryCode,
          articles: newsResult.value,
        })
      : renderNews({
          country: locationData.country,
          countryCode: locationData.countryCode,
          error: newsResult.reason.message,
        });

  if (weatherResult.status === "rejected") {
    console.error("Error en getWeather:", weatherResult.reason.message);
  }
  if (newsResult.status === "rejected") {
    console.error("Error en getNews:", newsResult.reason.message);
  }

  renderLayout({
    leftHTML: newsHTML,
    rightHTML: renderLocation(locationData) + weatherHTML,
  });
}

initSidebar();
