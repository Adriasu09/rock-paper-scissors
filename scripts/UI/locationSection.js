import { getCountryFlagUrl } from "../service/geolocationService.js";

export function renderLocation(locationData) {
  if (!locationData) {
    return `
    <article class="location-card">
      <div class="location-card__header">
        <img src="./assets/icon/map-pin.svg" alt="ubicación" class="location-card__icon" />
        <h3 class="location-card__title">Tu Ubicación</h3>
      </div>
      <div class="location-card__body">
        <p class="location-card__detail">Cargando ubicación...</p>
      </div>
      <div class="location-card__status">
        <span class="location-card__dot"></span>
        <span>Obteniendo ubicación</span>
      </div>
    </article>
    `;
  }

  if (locationData.error) {
    return `
    <article class="location-card location-card--error">
      <div class="location-card__header">
        <span class="location-card__warning-icon">⚠</span>
        <h3 class="location-card__title">${locationData.error}</h3>
      </div>
      <div class="location-card__body">
        <p class="location-card__detail">No se pudo obtener tu ubicación. Inténtalo de nuevo.</p>
      </div>
      <button id="retry-location" class="btn btn--sm location-card__retry-btn">
        Reintentar
      </button>
    </article>
    `;
  }

  const flagUrl = getCountryFlagUrl(locationData.countryCode);

  return `
  <article class="location-card">
    <div class="location-card__header">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin location-card__icon">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <h3 class="location-card__title">Tu Ubicación</h3>
    </div>
    <div class="location-card__body">
      <img src="${flagUrl}" alt="${locationData.countryCode}" class="location-card__flag" />
      <p class="location-card__country">${locationData.country}</p>
      <p class="location-card__detail">${locationData.city}, ${locationData.country}</p>
    </div>
    <div class="location-card__status">
      <span class="location-card__dot location-card__dot--active"></span>
      <span>Geolocalización activa</span>
    </div>
  </article>
  `;
}
