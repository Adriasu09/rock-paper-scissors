import { fetchData } from "./apiClient.js";
import { OPEN_METEO_BASE_URL, WEATHER_ICON_BASE_URL } from "../constants/urls.js";
import { WMO_CODES } from "../constants/weatherCodes.js";

function getWeatherInfo(code, isDay) {
  const entry = WMO_CODES[code];
  if (!entry) return { description: "Desconocido", icon: "01d" };
  return isDay ? entry.day : entry.night;
}

export async function getWeather(latitude, longitude) {
  const data = await fetchData(OPEN_METEO_BASE_URL, {
    latitude,
    longitude,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
  });
  const { current } = data;

  const isDay = current.is_day === 1;
  const { description, icon } = getWeatherInfo(current.weather_code, isDay);

  return {
    temperature: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    description,
    weatherCode: current.weather_code,
    iconUrl: `${WEATHER_ICON_BASE_URL}/${icon}@2x.png`,
    isDay,
  };
}
