import { fetchData } from "../helpers/fetchData.js";
import { OPEN_METEO_BASE_URL } from "../constants/urls.js";

const WEATHER_DESCRIPTIONS = {
  0: "Cielo despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  53: "Llovizna moderada",
  55: "Llovizna intensa",
  61: "Lluvia ligera",
  63: "Lluvia moderada",
  65: "Lluvia intensa",
  71: "Nieve ligera",
  73: "Nieve moderada",
  75: "Nieve intensa",
  80: "Chubascos ligeros",
  81: "Chubascos moderados",
  82: "Chubascos intensos",
  95: "Tormenta eléctrica",
  96: "Tormenta con granizo ligero",
  99: "Tormenta con granizo intenso",
};

function getWeatherDescription(code) {
  return WEATHER_DESCRIPTIONS[code] || "Desconocido";
}

export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
  });

  const url = `${OPEN_METEO_BASE_URL}?${params}`;
  const data = await fetchData(url);
  const { current } = data;

  return {
    temperature: Math.round(current.temperature_2m),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    description: getWeatherDescription(current.weather_code),
    weatherCode: current.weather_code,
  };
}
