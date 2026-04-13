export function renderWeather(weatherData) {
  if (!weatherData) {
    return `
    <article class="weather-card">
      <div class="weather-card__header">
        <img src="./assets/icon/cloud.svg" alt="clima" class="weather-card__icon" />
        <h3 class="weather-card__title">Clima Actual</h3>
      </div>
      <div class="weather-card__body">
        <p class="weather-card__detail">Cargando clima...</p>
      </div>
    </article>
    `;
  }

  if (weatherData.error) {
    return `
    <article class="weather-card">
      <div class="weather-card__header">
        <img src="./assets/icon/cloud.svg" alt="clima" class="weather-card__icon" />
        <h3 class="weather-card__title">Clima Actual</h3>
      </div>
      <div class="weather-card__body">
        <p class="weather-card__detail">${weatherData.error}</p>
      </div>
    </article>
    `;
  }

  return `
  <article class="weather-card">
    <div class="weather-card__header">
      <img src="./assets/icon/cloud.svg" alt="clima" class="weather-card__icon" />
      <h3 class="weather-card__title">Clima Actual</h3>
    </div>
    <div class="weather-card__body">
      <p class="weather-card__temperature">${weatherData.temperature}°C</p>
      <p class="weather-card__description">${weatherData.description}</p>
    </div>
    <div class="weather-card__footer">
      <span class="weather-card__stat">🌬 ${weatherData.windSpeed} km/h</span>
      <span class="weather-card__stat">💧 ${weatherData.humidity}%</span>
    </div>
    <p class="weather-card__source">via Open-Meteo</p>
  </article>
  `;
}
