import { getUserLocation } from "../services/geolocationService.js";
import { getWeather } from "../services/weatherService.js";
import { getNews } from "../services/newsService.js";
import { renderLocation } from "./locationSection.js";
import { renderWeather } from "./weatherSection.js";
import { renderNews } from "./newsSection.js";

export async function loadSidebar(renderLayout) {
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
    console.error("getUserLocation failed:", error.message);
    renderLayout({
      leftHTML: renderNews({
        error: "Se requiere ubicación para las noticias",
      }),
      rightHTML:
        renderLocation({ error: error.message }) +
        renderWeather({ error: "Se requiere ubicación para el clima" }),
    });
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
    console.error("getWeather failed:", weatherResult.reason.message);
  }
  if (newsResult.status === "rejected") {
    console.error("getNews failed:", newsResult.reason.message);
  }

  renderLayout({
    leftHTML: newsHTML,
    rightHTML: renderLocation(locationData) + weatherHTML,
  });
}
