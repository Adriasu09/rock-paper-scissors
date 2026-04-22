import { getUserLocation } from "../services/geolocationService.js";
import { getWeather } from "../services/weatherService.js";
import { getNews } from "../services/newsService.js";
import { renderLocation } from "./locationSection.js";
import { renderWeather } from "./weatherSection.js";
import { renderNews } from "./newsSection.js";
import { logError, toUserMessage } from "../helpers/errorHandler.js";
import { ERROR_MESSAGES } from "../constants/errorMessages.js";

export async function loadSidebar(renderNavbarWith, renderLayout) {
  renderNavbarWith(null, null);
  renderLayout({
    leftHTML: renderNews(null),
    leftHTML: "",
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
    logError("sidebar:getUserLocation", error);
    renderLayout({
      leftHTML: renderNews({ error: ERROR_MESSAGES.location.forNews }),
      rightHTML:
        renderLocation({
          error: toUserMessage(error, ERROR_MESSAGES.location.needed),
        }) + renderWeather({ error: ERROR_MESSAGES.location.forWeather }),
    });
    return;
  }

  const [weatherResult, newsResult] = await Promise.allSettled([
    getWeather(locationData.latitude, locationData.longitude),
    getNews(locationData.countryCode),
  ]);

  const weatherData =
    weatherResult.status === "fulfilled" ? weatherResult.value : null;

  const weatherHTML =
    weatherResult.status === "fulfilled"
      ? renderWeather(weatherData)
      : renderWeather({
          error: toUserMessage(
            weatherResult.reason,
            ERROR_MESSAGES.weather.default,
          ),
        });

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
          error: toUserMessage(newsResult.reason, ERROR_MESSAGES.news.default),
        });

  if (weatherResult.status === "rejected") {
    logError("sidebar:getWeather", weatherResult.reason);
  }
  if (newsResult.status === "rejected") {
    logError("sidebar:getNews", newsResult.reason);
  }

  renderNavbarWith(locationData, weatherData);
  renderLayout({
    leftHTML: newsHTML,
    rightHTML: renderLocation(locationData) + weatherHTML,
  });
}
