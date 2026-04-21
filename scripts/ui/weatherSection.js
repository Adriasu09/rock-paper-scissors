export function renderWeather(weatherData) {
  if (!weatherData) {
    return `
    <article class="weather-card">
      <div class="weather-card__header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud weather-card__icon">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud weather-card__icon">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud weather-card__icon">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
      <h3 class="weather-card__title">Clima Actual</h3>
    </div>    
      <p class="weather-card__temperature">${weatherData.temperature}°C</p>
      <div class="weather-card__details">
      <img
        class="weather-card__weather-icon"
        src="${weatherData.iconUrl}"
        alt="${weatherData.description}"
        width="64"
        height="64"
      />
      <p class="weather-card__description">${weatherData.description}</p>
      </div>
    <div class="weather-card__footer">
      <span class="weather-card__stat">💨 ${weatherData.windSpeed} km/h</span>
      <span class="weather-card__stat">💧 ${weatherData.humidity}%</span>
    </div>
    <p class="weather-card__source">via Open-Meteo</p>
  </article>
  `;
}
