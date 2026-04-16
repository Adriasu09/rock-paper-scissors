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

let isLoading = false;

async function initSidebar() {
  //if (isLoading) return;
  //isLoading = true;

  renderSidebar(renderLocation(null), renderWeather(null));

  let locationData = null;

  try {
    locationData = await getUserLocation();
    renderSidebar(renderLocation(locationData), renderWeather(null));
  } catch (error) {
    console.error("Error en getUserLocation:", error.message);
    renderSidebar(
      renderLocation({ error: error.message }),
      renderWeather({ error: "Se requiere ubicación para el clima" }),
    );

    document
      .getElementById("retry-location")
      .addEventListener("click", initSidebar);
    //isLoading = false;
    return;
  }

  try {
    const weatherData = await getWeather(
      locationData.latitude,
      locationData.longitude,
    );
    renderSidebar(renderLocation(locationData), renderWeather(weatherData));
  } catch (error) {
    console.error("Error en getWeather:", error.message);
    renderSidebar(
      renderLocation(locationData),
      renderWeather({ error: error.message }),
    );
  }

  //isLoading = false;
}

initSidebar();
