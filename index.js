import { getUserLocation } from "./scripts/service/geolocationService.js";
import { getWeather } from "./scripts/service/weatherService.js";
import { renderLocation } from "./scripts/UI/locationSection.js";
import { renderWeather } from "./scripts/UI/weatherSection.js";

const root = document.getElementById("root");

function renderSidebar(locationHTML, weatherHTML) {
  root.innerHTML = `
    <aside class="sidebar">
      ${locationHTML}
      ${weatherHTML}
    </aside>
  `;
}

async function initSidebar() {
  console.log("🚀 initSidebar arrancando...");
  renderSidebar(renderLocation(null), renderWeather(null));

  let locationData = null;

  try {
    console.log("📍 Pidiendo geolocalización...");
    console.log("¿navigator.geolocation disponible?", !!navigator.geolocation);
    locationData = await getUserLocation();
    console.log("✅ Ubicación obtenida:", locationData);
    renderSidebar(renderLocation(locationData), renderWeather(null));
  } catch (error) {
    console.error("❌ Error en getUserLocation:", error.message);
    renderSidebar(
      renderLocation({ error: error.message }),
      renderWeather({ error: "Se requiere ubicación para el clima" })
    );
    return;
  }

  try {
    console.log("🌤 Pidiendo clima para:", locationData.latitude, locationData.longitude);
    const weatherData = await getWeather(locationData.latitude, locationData.longitude);
    console.log("✅ Clima obtenido:", weatherData);
    renderSidebar(renderLocation(locationData), renderWeather(weatherData));
  } catch (error) {
    console.error("❌ Error en getWeather:", error.message);
    renderSidebar(
      renderLocation(locationData),
      renderWeather({ error: error.message })
    );
  }
}

initSidebar();
