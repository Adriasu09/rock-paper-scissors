import { getUserLocation } from "./scripts/service/geolocationService.js";
import { getWeather } from "./scripts/service/weatherService.js";
import { getNews } from "./scripts/service/newsService.js";
import { renderLocation } from "./scripts/UI/locationSection.js";
import { renderWeather } from "./scripts/UI/weatherSection.js";
import { renderNews } from "./scripts/UI/newsSection.js";
import { renderNavbar, initNavbarInteractions } from "./scripts/UI/navbar.js";
import { renderFooter } from "./scripts/UI/footer.js";
import { renderGameScreen } from "./scripts/UI/gameScreen.js";

const root = document.getElementById("root");
const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer");
footer.innerHTML = renderFooter();

//let gameState = { view: "start" }; // ← pantalla de inicio (por defecto)
let gameState = { view: "play" }; // ← juego en curso
//let gameState = { view: "gameOver" }; // ← fin del juego

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
}

function renderNavbarWith(locationData, weatherData) {
  navbar.innerHTML = renderNavbar(locationData, weatherData);
  initNavbarInteractions();
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
  renderNavbarWith(null, null);
  renderLayout({
    leftHTML: renderNews(null),
    rightHTML: renderLocation(null) + renderWeather(null),
  });

  let locationData = null;

  try {
    locationData = await getUserLocation();
    renderNavbarWith(locationData, null);
    renderLayout({
      leftHTML: renderNews(null),
      rightHTML: renderLocation(locationData) + renderWeather(null),
    });
  } catch (error) {
    console.error("Error en getUserLocation:", error.message);
    renderNavbarWith({ error: error.message }, { error: "Sin datos" });
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

  const weatherData =
    weatherResult.status === "fulfilled"
      ? weatherResult.value
      : { error: weatherResult.reason.message };

  const weatherHTML = renderWeather(weatherData);

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

  renderNavbarWith(locationData, weatherData);
  renderLayout({
    leftHTML: newsHTML,
    rightHTML: renderLocation(locationData) + weatherHTML,
  });
}

initSidebar();
